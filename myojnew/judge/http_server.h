#ifndef JUDGE_HTTP_SERVER_H
#define JUDGE_HTTP_SERVER_H

#include <string>
#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include "config.h"
#include "utils.h"
#include "judge_core.h"
using namespace std;

#pragma comment(lib, "ws2_32.lib")

// 解析 JSON 字符串字段
string extractJsonString(const string& body, const string& key) {
    string searchKey = "\"" + key + "\"";
    size_t pos = body.find(searchKey);
    if (pos == string::npos) return "";
    
    pos = body.find("\"", pos + searchKey.length() + 1);
    if (pos == string::npos) return "";
    pos++;
    
    string result;
    while (pos < body.length() && !(body[pos] == '"' && (pos == 0 || body[pos-1] != '\\'))) {
        if (body[pos] == '\\' && pos + 1 < body.length()) {
            if (body[pos+1] == 'n') result += '\n';
            else if (body[pos+1] == 't') result += '\t';
            else if (body[pos+1] == 'r') {}
            else if (body[pos+1] == '"') result += '"';
            else if (body[pos+1] == '\\') result += '\\';
            pos += 2;
        } else {
            result += body[pos++];
        }
    }
    return result;
}

// 解析 JSON 整数字段
int extractJsonInt(const string& body, const string& key) {
    string searchKey = "\"" + key + "\"";
    size_t pos = body.find(searchKey);
    if (pos == string::npos) return 0;
    
    pos = body.find(":", pos);
    if (pos == string::npos) return 0;
    pos++;
    
    string numStr;
    while (pos < body.length() && (isdigit(body[pos]) || body[pos] == '-')) {
        numStr += body[pos++];
    }
    return numStr.empty() ? 0 : stoi(numStr);
}

// 发送 HTTP 响应
void sendResponse(SOCKET client, const string& content, const string& contentType = "application/json; charset=utf-8") {
    string response = "HTTP/1.1 200 OK\r\n"
                      "Access-Control-Allow-Origin: *\r\n"
                      "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"
                      "Access-Control-Allow-Headers: Content-Type\r\n"
                      "Content-Type: " + contentType + "\r\n"
                      "Content-Length: " + to_string(content.length()) + "\r\n"
                      "Connection: close\r\n"
                      "\r\n" + content;
    send(client, response.c_str(), response.length(), 0);
}

// 读取完整 HTTP 请求（处理分块到达）
string readFullRequest(SOCKET client) {
    char buffer[65536];
    string request;
    int totalReceived = 0;

    while (totalReceived < (int)sizeof(buffer) - 1) {
        int bytesReceived = recv(client, buffer + totalReceived,
                                 sizeof(buffer) - 1 - totalReceived, 0);
        if (bytesReceived <= 0) return "";
        totalReceived += bytesReceived;
        buffer[totalReceived] = '\0';
        request = string(buffer, totalReceived);

        // 检查头部是否完整
        size_t headerEnd = request.find("\r\n\r\n");
        if (headerEnd == string::npos) continue;

        // 查找 Content-Length 判断是否需要继续读取 body
        size_t clPos = request.find("Content-Length: ");
        if (clPos == string::npos) clPos = request.find("content-length: ");
        if (clPos == string::npos) break; // 无 body，请求完整

        clPos = request.find(':', clPos) + 1;
        while (clPos < request.length() && request[clPos] == ' ') clPos++;
        string clStr;
        while (clPos < request.length() && isdigit(request[clPos]))
            clStr += request[clPos++];
        int contentLength = stoi(clStr);
        int bodyStart = (int)(headerEnd + 4);

        if (totalReceived >= bodyStart + contentLength) break;
        // body 未收完，继续 recv
    }
    return request;
}

// 处理客户端请求
void handleClient(SOCKET client) {
    string request = readFullRequest(client);
    if (request.empty()) {
        closesocket(client);
        return;
    }
    
    // CORS 预检
    if (request.find("OPTIONS") == 0) {
        string response = "HTTP/1.1 200 OK\r\n"
                          "Access-Control-Allow-Origin: *\r\n"
                          "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"
                          "Access-Control-Allow-Headers: Content-Type\r\n"
                          "Content-Length: 0\r\n\r\n";
        send(client, response.c_str(), response.length(), 0);
        closesocket(client);
        return;
    }
    
    // GET /api/problems - 获取题目列表
    if (request.find("GET /api/problems") == 0) {
        string json = "[";
        for (int i = 1; i <= 50; i++) {
            string configPath = PROBLEMS_DIR + "/" + to_string(i) + "/problem.json";
            if (fileExists(configPath)) {
                string config = readFile(configPath);
                if (json.length() > 1) json += ",";
                json += config;
            }
        }
        json += "]";
        sendResponse(client, json);
        closesocket(client);
        return;
    }
    
    // GET /api/problem?id=X - 获取单个题目
    if (request.find("GET /api/problem") == 0) {
        size_t idPos = request.find("id=");
        int problemId = 1;
        if (idPos != string::npos) {
            string numStr;
            idPos += 3;
            while (idPos < request.length() && isdigit(request[idPos])) {
                numStr += request[idPos++];
            }
            if (!numStr.empty()) problemId = stoi(numStr);
        }
        
        string configPath = PROBLEMS_DIR + "/" + to_string(problemId) + "/problem.json";
        if (fileExists(configPath)) {
            sendResponse(client, readFile(configPath));
        } else {
            sendResponse(client, "{\"error\":\"题目不存在\"}");
        }
        closesocket(client);
        return;
    }
    
    // POST /api/register - 注册
    if (request.find("POST /api/register") == 0) {
        size_t bodyPos = request.find("\r\n\r\n");
        if (bodyPos != string::npos) {
            string body = request.substr(bodyPos + 4);
            string username = extractJsonString(body, "username");
            string password = extractJsonString(body, "password");
            sendResponse(client, registerUser(username, password));
        }
        closesocket(client);
        return;
    }
    
    // POST /api/login - 登录
    if (request.find("POST /api/login") == 0) {
        size_t bodyPos = request.find("\r\n\r\n");
        if (bodyPos != string::npos) {
            string body = request.substr(bodyPos + 4);
            string username = extractJsonString(body, "username");
            string password = extractJsonString(body, "password");
            sendResponse(client, loginUser(username, password));
        }
        closesocket(client);
        return;
    }
    
    // POST /api/submit - 提交代码
    if (request.find("POST /api/submit") == 0) {
        size_t bodyPos = request.find("\r\n\r\n");
        if (bodyPos != string::npos) {
            string body = request.substr(bodyPos + 4);
            int problemId = extractJsonInt(body, "problemId");
            string language = extractJsonString(body, "language");
            string code = extractJsonString(body, "code");
            int uid = extractJsonInt(body, "uid");
            
            string result = judge(problemId, language, code, uid);
            sendResponse(client, result);
        }
        closesocket(client);
        return;
    }
    
    // GET /api/history?uid=X - 获取提交历史
    if (request.find("GET /api/history") == 0) {
        size_t uidPos = request.find("uid=");
        int uid = 0;
        if (uidPos != string::npos) {
            string numStr;
            uidPos += 4;
            while (uidPos < request.length() && isdigit(request[uidPos])) {
                numStr += request[uidPos++];
            }
            if (!numStr.empty()) uid = stoi(numStr);
        }
        sendResponse(client, getSubmissionHistory(uid));
        closesocket(client);
        return;
    }
    
    // GET /api/failed?uid=X - 获取未通过题目
    if (request.find("GET /api/failed") == 0) {
        size_t uidPos = request.find("uid=");
        int uid = 0;
        if (uidPos != string::npos) {
            string numStr;
            uidPos += 4;
            while (uidPos < request.length() && isdigit(request[uidPos])) {
                numStr += request[uidPos++];
            }
            if (!numStr.empty()) uid = stoi(numStr);
        }
        sendResponse(client, getFailedProblems(uid));
        closesocket(client);
        return;
    }
    
    // GET /api/user-problems?uid=X - 获取用户提交过的所有题目（含状态）
    if (request.find("GET /api/user-problems") == 0) {
        size_t uidPos = request.find("uid=");
        int uid = 0;
        if (uidPos != string::npos) {
            string numStr;
            uidPos += 4;
            while (uidPos < request.length() && isdigit(request[uidPos])) {
                numStr += request[uidPos++];
            }
            if (!numStr.empty()) uid = stoi(numStr);
        }
        sendResponse(client, getUserProblems(uid));
        closesocket(client);
        return;
    }
    
    // GET /api/passed?uid=X - 获取已通过题目
    if (request.find("GET /api/passed") == 0) {
        size_t uidPos = request.find("uid=");
        int uid = 0;
        if (uidPos != string::npos) {
            string numStr;
            uidPos += 4;
            while (uidPos < request.length() && isdigit(request[uidPos])) {
                numStr += request[uidPos++];
            }
            if (!numStr.empty()) uid = stoi(numStr);
        }
        sendResponse(client, getPassedProblems(uid));
        closesocket(client);
        return;
    }

    // GET /api/leaderboard - 获取排行榜
    if (request.find("GET /api/leaderboard") == 0) {
        sendResponse(client, getLeaderboard());
        closesocket(client);
        return;
    }

    // GET /api/stats?uid=X - 获取用户统计数据
    if (request.find("GET /api/stats") == 0) {
        size_t uidPos = request.find("uid=");
        int uid = 0;
        if (uidPos != string::npos) {
            string numStr;
            uidPos += 4;
            while (uidPos < request.length() && isdigit(request[uidPos])) numStr += request[uidPos++];
            if (!numStr.empty()) uid = stoi(numStr);
        }
        sendResponse(client, getUserStats(uid));
        closesocket(client);
        return;
    }

    // 静态文件服务 - 提供前端页面
    if (request.find("GET /") == 0) {
        string path = request.substr(4, request.find(" ", 4) - 4);
        if (path == "/") path = "/index.html";
        
        // 安全检查：防止路径遍历
        if (path.find("..") != string::npos) {
            sendResponse(client, "{\"error\":\"禁止访问\"}");
            closesocket(client);
            return;
        }
        
        string filePath = FRONTEND_DIR + path;
        if (fileExists(filePath)) {
            string content = readFile(filePath);
            string contentType = "text/plain";
            
            if (endsWith(path, ".html")) contentType = "text/html; charset=utf-8";
            else if (endsWith(path, ".css")) contentType = "text/css; charset=utf-8";
            else if (endsWith(path, ".js")) contentType = "application/javascript; charset=utf-8";
            else if (endsWith(path, ".json")) contentType = "application/json; charset=utf-8";
            else if (endsWith(path, ".png")) contentType = "image/png";
            else if (endsWith(path, ".jpg") || endsWith(path, ".jpeg")) contentType = "image/jpeg";
            else if (endsWith(path, ".svg")) contentType = "image/svg+xml";
            else if (endsWith(path, ".ico")) contentType = "image/x-icon";
            
            sendResponse(client, content, contentType);
        } else {
            sendResponse(client, "{\"error\":\"文件不存在\"}");
        }
        closesocket(client);
        return;
    }
    
    // 404
    sendResponse(client, "{\"error\":\"未知请求\"}");
    closesocket(client);
}

// 启动 HTTP 服务器
void startServer(int port = 8080) {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        cerr << "WSAStartup 失败" << endl;
        return;
    }
    
    SOCKET server = socket(AF_INET, SOCK_STREAM, 0);
    if (server == INVALID_SOCKET) {
        cerr << "创建 socket 失败" << endl;
        WSACleanup();
        return;
    }
    
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));
    
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(port);
    
    if (bind(server, (sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        cerr << "绑定端口 " << port << " 失败" << endl;
        closesocket(server);
        WSACleanup();
        return;
    }
    
    if (listen(server, SOMAXCONN) == SOCKET_ERROR) {
        cerr << "监听失败" << endl;
        closesocket(server);
        WSACleanup();
        return;
    }
    
    cout << "评测服务器已启动，监听端口: " << port << endl;
    cout << "API 地址: http://localhost:" << port << "/api/problems" << endl;
    
    while (true) {
        SOCKET client = accept(server, NULL, NULL);
        if (client != INVALID_SOCKET) {
            handleClient(client);
        }
    }
    
    closesocket(server);
    WSACleanup();
}

#endif