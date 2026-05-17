#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cstdlib>
#include <chrono>
#include <thread>
#include <cstdio>
#include <memory>
#include <stdexcept>
#include <array>
#include <algorithm>
#include <cctype>
#include <functional>
#include <windows.h>
#include <process.h>
#include <tlhelp32.h>
#include <io.h>
#include <direct.h>
#include <sys/stat.h>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "ws2_32.lib")

using namespace std;

// ===== 配置 =====
const string BASE_DIR = "d:/myoj";
const string SUBMISSIONS_DIR = BASE_DIR + "/submissions";
const string TEMP_DIR = BASE_DIR + "/temp";
const string PROBLEMS_DIR = BASE_DIR + "/problems";

// ===== 跨平台兼容的文件系统操作 =====
bool fileExists(const string& path) {
    struct stat buffer;
    return (stat(path.c_str(), &buffer) == 0);
}

bool dirExists(const string& path) {
    struct stat buffer;
    if (stat(path.c_str(), &buffer) != 0) return false;
    return (buffer.st_mode & _S_IFDIR) != 0;
}

bool createDir(const string& path) {
    return _mkdir(path.c_str()) == 0 || errno == EEXIST;
}

bool createDirs(const string& path) {
    string current;
    for (size_t i = 0; i < path.length(); i++) {
        current += path[i];
        if (path[i] == '/' || path[i] == '\\' || i == path.length() - 1) {
            if (!current.empty() && current != "/" && current != "\\") {
                _mkdir(current.c_str());
            }
        }
    }
    return true;
}

bool removeFile(const string& path) {
    return remove(path.c_str()) == 0;
}

// ===== 工具函数 =====
string trim(const string& str) {
    size_t first = str.find_first_not_of(" \t\n\r\f\v");
    if (first == string::npos) return "";
    size_t last = str.find_last_not_of(" \t\n\r\f\v");
    return str.substr(first, last - first + 1);
}

string readFile(const string& path) {
    ifstream file(path);
    if (!file.is_open()) return "";
    stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

void writeFile(const string& path, const string& content) {
    ofstream file(path);
    file << content;
}

string escapeJson(const string& s) {
    string result;
    for (char c : s) {
        switch (c) {
            case '"': result += "\\\""; break;
            case '\\': result += "\\\\"; break;
            case '\n': result += "\\n"; break;
            case '\r': result += "\\r"; break;
            case '\t': result += "\\t"; break;
            default: result += c;
        }
    }
    return result;
}

// ===== 编译代码 =====
string compileCode(const string& sourcePath, const string& outputPath, const string& language) {
    string cmd;
    if (language == "cpp") {
        cmd = "g++ \"" + sourcePath + "\" -o \"" + outputPath + "\" -O2 -std=c++11 2>&1";
    } else if (language == "c") {
        cmd = "gcc \"" + sourcePath + "\" -o \"" + outputPath + "\" -O2 -std=c11 2>&1";
    } else {
        return "不支持的语言: " + language;
    }

    array<char, 4096> buffer;
    string result;
    FILE* pipe = _popen(cmd.c_str(), "r");
    if (!pipe) return "无法启动编译器";
    
    while (fgets(buffer.data(), buffer.size(), pipe) != nullptr) {
        result += buffer.data();
    }
    int exitCode = _pclose(pipe);
    
    if (exitCode != 0 || !fileExists(outputPath)) {
        return result.empty() ? "编译失败" : result;
    }
    return ""; // 编译成功
}

// ===== 运行代码并评测 =====
struct JudgeResult {
    string status;  // AC, WA, TLE, RE, CE, PE
    long long timeMs;
    string detail;
};

// 辅助函数：递归终止进程树
void killProcessTree(DWORD pid) {
    // 创建进程快照
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snapshot == INVALID_HANDLE_VALUE) return;
    
    PROCESSENTRY32 pe = { sizeof(pe) };
    
    // 先收集所有子进程 PID（避免遍历时修改导致问题）
    vector<DWORD> childPids;
    if (Process32First(snapshot, &pe)) {
        do {
            if (pe.th32ParentProcessID == pid) {
                childPids.push_back(pe.th32ProcessID);
            }
        } while (Process32Next(snapshot, &pe));
    }
    CloseHandle(snapshot);
    
    // 递归终止子进程
    for (DWORD childPid : childPids) {
        killProcessTree(childPid);
    }
    
    // 终止当前进程
    HANDLE hProcess = OpenProcess(PROCESS_TERMINATE, FALSE, pid);
    if (hProcess != NULL) {
        TerminateProcess(hProcess, 1);
        CloseHandle(hProcess);
    }
}

string runProcess(const string& exePath, const string& inputFile, const string& outputFile, long long timeLimitMs) {
    // 使用 Windows API 创建进程
    STARTUPINFOA si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    
    // 构建命令：直接运行程序，输入重定向，输出重定向
    // 不使用 cmd.exe /c，避免额外的进程层
    string fullCmd = "\"" + exePath + "\"";
    
    // 设置标准输入输出重定向
    SECURITY_ATTRIBUTES sa = { sizeof(sa), NULL, TRUE };
    
    // 打开输入文件
    HANDLE hInput = CreateFileA(inputFile.c_str(), GENERIC_READ, FILE_SHARE_READ, &sa,
                                OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    // 打开输出文件
    HANDLE hOutput = CreateFileA(outputFile.c_str(), GENERIC_WRITE, FILE_SHARE_READ, &sa,
                                 CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
    
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdInput = hInput;
    si.hStdOutput = hOutput;
    si.hStdError = GetStdHandle(STD_ERROR_HANDLE);
    
    char* cmdLine = new char[fullCmd.length() + 1];
    strcpy(cmdLine, fullCmd.c_str());
    
    // 创建作业对象，确保所有子进程都能被终止
    HANDLE hJob = CreateJobObject(NULL, NULL);
    JOBOBJECT_EXTENDED_LIMIT_INFORMATION jeli = { 0 };
    jeli.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
    SetInformationJobObject(hJob, JobObjectExtendedLimitInformation, &jeli, sizeof(jeli));
    
    if (!CreateProcessA(NULL, cmdLine, NULL, NULL, TRUE,
                        CREATE_NO_WINDOW | CREATE_SUSPENDED,
                        NULL, NULL, &si, &pi)) {
        delete[] cmdLine;
        if (hInput != INVALID_HANDLE_VALUE) CloseHandle(hInput);
        if (hOutput != INVALID_HANDLE_VALUE) CloseHandle(hOutput);
        if (hJob) CloseHandle(hJob);
        return "RE";
    }
    delete[] cmdLine;
    
    // 将进程分配到作业对象
    AssignProcessToJobObject(hJob, pi.hProcess);
    
    // 恢复线程执行
    ResumeThread(pi.hThread);
    
    // 等待进程完成或超时
    DWORD waitResult = WaitForSingleObject(pi.hProcess, (DWORD)timeLimitMs);
    
    if (waitResult == WAIT_TIMEOUT) {
        // 超时 - 通过作业对象终止整个进程树
        TerminateJobObject(hJob, 1);
        // 额外确保主进程也被终止
        TerminateProcess(pi.hProcess, 1);
        
        CloseHandle(hJob);
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
        if (hInput != INVALID_HANDLE_VALUE) CloseHandle(hInput);
        if (hOutput != INVALID_HANDLE_VALUE) CloseHandle(hOutput);
        return "TLE";
    }
    
    // 获取退出代码
    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);
    
    CloseHandle(hJob);
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    if (hInput != INVALID_HANDLE_VALUE) CloseHandle(hInput);
    if (hOutput != INVALID_HANDLE_VALUE) CloseHandle(hOutput);
    
    if (exitCode != 0) {
        return "RE";
    }
    
    return "AC";
}

JudgeResult judgeTestCase(const string& exePath, const string& inputFile,
                          const string& expectedOutputFile, long long timeLimitMs,
                          const string& outputFile) {
    JudgeResult result;
    
    auto startTime = chrono::steady_clock::now();
    
    string runResult = runProcess(exePath, inputFile, outputFile, timeLimitMs);
    
    auto endTime = chrono::steady_clock::now();
    result.timeMs = chrono::duration_cast<chrono::milliseconds>(endTime - startTime).count();
    
    if (runResult == "TLE") {
        result.status = "TLE";
        result.detail = "运行超时（限制：" + to_string(timeLimitMs) + "ms）";
        return result;
    }
    
    if (runResult == "RE") {
        result.status = "RE";
        string errorOutput = readFile(outputFile);
        result.detail = "运行时错误\n" + (errorOutput.empty() ? "程序异常退出" : errorOutput);
        return result;
    }
    
    // 读取实际输出和期望输出
    string actualOutput = trim(readFile(outputFile));
    string expectedOutput = trim(readFile(expectedOutputFile));
    
    // 比较输出
    if (actualOutput == expectedOutput) {
        result.status = "AC";
        result.detail = "通过";
    } else {
        // 检查是否是格式错误（去掉空白字符后比较）
        string actualNoSpace, expectedNoSpace;
        for (char c : actualOutput) if (!isspace(c)) actualNoSpace += c;
        for (char c : expectedOutput) if (!isspace(c)) expectedNoSpace += c;
        
        if (actualNoSpace == expectedNoSpace) {
            result.status = "PE";
            result.detail = "格式错误\n期望输出：\n" + expectedOutput + "\n实际输出：\n" + actualOutput;
        } else {
            result.status = "WA";
            result.detail = "答案错误\n期望输出：\n" + expectedOutput + "\n实际输出：\n" + actualOutput;
        }
    }
    
    return result;
}

// ===== 主评测函数 =====
string judge(int problemId, const string& language, const string& code) {
    try {
        // 创建临时目录
        createDirs(TEMP_DIR);
        createDirs(SUBMISSIONS_DIR);
        
        // 使用时间戳+随机数生成唯一文件名，避免并发冲突
        srand((unsigned int)time(NULL) ^ (unsigned int)GetCurrentThreadId());
        string timestamp = to_string(GetTickCount()) + "_" + to_string(rand() % 10000);
        string sourceFile = TEMP_DIR + "/submission_" + timestamp + "." + (language == "cpp" ? "cpp" : "c");
        string exeFile = TEMP_DIR + "/submission_" + timestamp + ".exe";
        string outputFile = TEMP_DIR + "/output_" + timestamp + ".tmp";
        
        // 先清理可能残留的旧临时文件（超过10分钟的）
        // 这个操作不频繁做，避免影响性能
        
        writeFile(sourceFile, code);
        
        // 编译
        string compileError = compileCode(sourceFile, exeFile, language);
        if (!compileError.empty()) {
            // 返回编译错误
            string json = "{\"status\":\"CE\",\"results\":[{\"status\":\"CE\",\"time\":0,\"detail\":\"";
            json += escapeJson(compileError);
            json += "\"}]}";
            // 清理
            removeFile(sourceFile);
            return json;
        }
        
        // 读取题目配置
        string problemPath = PROBLEMS_DIR + "/" + to_string(problemId);
        string configPath = problemPath + "/problem.json";
        
        ifstream configFile(configPath);
        if (!configFile.is_open()) {
            removeFile(sourceFile);
            removeFile(exeFile);
            return "{\"status\":\"ERROR\",\"results\":[{\"status\":\"CE\",\"time\":0,\"detail\":\"找不到题目配置\"}]}";
        }
        
        // 解析 JSON 获取测试用例数
        string configJson((istreambuf_iterator<char>(configFile)), istreambuf_iterator<char>());
        
        // 简单解析测试用例数
        int testCases = 3; // 默认
        size_t pos = configJson.find("\"testCases\"");
        if (pos != string::npos) {
            pos = configJson.find(":", pos);
            if (pos != string::npos) {
                string numStr;
                pos++;
                while (pos < configJson.length() && isdigit(configJson[pos])) {
                    numStr += configJson[pos++];
                }
                if (!numStr.empty()) testCases = stoi(numStr);
            }
        }
        
        // 获取时间限制
        long long timeLimit = 1000; // 默认1秒
        pos = configJson.find("\"timeLimit\"");
        if (pos != string::npos) {
            pos = configJson.find(":", pos);
            if (pos != string::npos) {
                string numStr;
                pos++;
                while (pos < configJson.length() && isdigit(configJson[pos])) {
                    numStr += configJson[pos++];
                }
                if (!numStr.empty()) timeLimit = stoll(numStr);
            }
        }
        
        // 评测每个测试点
        string json = "{\"status\":\"\",\"results\":[";
        
        for (int i = 1; i <= testCases; i++) {
            string inputFile = problemPath + "/input/" + to_string(i) + ".in";
            string expectedOutputFile = problemPath + "/output/" + to_string(i) + ".out";
            
            if (!fileExists(inputFile) || !fileExists(expectedOutputFile)) {
                if (i > 1) json += ",";
                json += "{\"status\":\"CE\",\"time\":0,\"detail\":\"测试点 #" + to_string(i) + " 数据缺失\"}";
                continue;
            }
            
            JudgeResult result = judgeTestCase(exeFile, inputFile, expectedOutputFile, timeLimit, outputFile);
            
            if (i > 1) json += ",";
            json += "{\"status\":\"" + result.status + "\",\"time\":" + to_string(result.timeMs) + ",\"detail\":\"" + escapeJson(result.detail) + "\"}";
        }
        
        json += "]}";
        
        // 清理临时文件
        removeFile(sourceFile);
        // 多次尝试删除 exe 文件（可能被进程锁定）
        for (int retry = 0; retry < 5; retry++) {
            if (removeFile(exeFile)) break;
            Sleep(100); // 等待100ms后重试
        }
        removeFile(outputFile);
        
        return json;
        
    } catch (const exception& e) {
        return "{\"status\":\"ERROR\",\"results\":[{\"status\":\"CE\",\"time\":0,\"detail\":\"" + escapeJson(e.what()) + "\"}]}";
    }
}

// ===== 简单 HTTP 服务器 =====
void handleClient(SOCKET client) {
    const int BUFFER_SIZE = 65536;
    char* buffer = new char[BUFFER_SIZE];
    
    int bytesReceived = recv(client, buffer, BUFFER_SIZE - 1, 0);
    if (bytesReceived <= 0) {
        closesocket(client);
        delete[] buffer;
        return;
    }
    buffer[bytesReceived] = '\0';
    
    string request(buffer);
    delete[] buffer;
    
    // CORS 头
    string corsHeaders = 
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"
        "Access-Control-Allow-Headers: Content-Type\r\n";
    
    // 处理 OPTIONS 请求（CORS 预检）
    if (request.find("OPTIONS") == 0) {
        string response = "HTTP/1.1 200 OK\r\n" + corsHeaders + "Content-Length: 0\r\n\r\n";
        send(client, response.c_str(), response.length(), 0);
        closesocket(client);
        return;
    }
    
    // 处理 GET 请求 - 返回题目列表
    if (request.find("GET /api/problems") == 0) {
        string json = "[";
        for (int i = 1; i <= 13; i++) {
            string configPath = PROBLEMS_DIR + "/" + to_string(i) + "/problem.json";
            if (fileExists(configPath)) {
                string config = readFile(configPath);
                if (i > 1) json += ",";
                json += config;
            }
        }
        json += "]";
        
        string response = "HTTP/1.1 200 OK\r\n"
                   "Content-Type: application/json; charset=utf-8\r\n" +
                   corsHeaders +
                   "Content-Length: " + to_string(json.length()) + "\r\n\r\n" + json;
        send(client, response.c_str(), response.length(), 0);
        closesocket(client);
        return;
    }
    
    // 处理 POST 请求 - 提交代码
    if (request.find("POST /api/submit") == 0) {
        // 提取请求体
        size_t bodyStart = request.find("\r\n\r\n");
        if (bodyStart != string::npos) {
            string body = request.substr(bodyStart + 4);
            
            // 解析 JSON
            int problemId = 1;
            string language = "cpp";
            string code;
            
            size_t pos;
            
            pos = body.find("\"problemId\"");
            if (pos != string::npos) {
                pos = body.find(":", pos);
                if (pos != string::npos) {
                    string numStr;
                    pos++;
                    while (pos < body.length() && (isdigit(body[pos]) || body[pos] == '-')) {
                        numStr += body[pos++];
                    }
                    if (!numStr.empty()) problemId = stoi(numStr);
                }
            }
            
            pos = body.find("\"language\"");
            if (pos != string::npos) {
                pos = body.find("\"", pos + 10);
                if (pos != string::npos) {
                    pos++;
                    string langStr;
                    while (pos < body.length() && body[pos] != '"') {
                        langStr += body[pos++];
                    }
                    if (!langStr.empty()) language = langStr;
                }
            }
            
            pos = body.find("\"code\"");
            if (pos != string::npos) {
                pos = body.find("\"", pos + 6);
                if (pos != string::npos) {
                    pos++;
                    while (pos < body.length() && !(body[pos] == '"' && (pos == 0 || body[pos-1] != '\\'))) {
                        if (body[pos] == '\\' && pos + 1 < body.length()) {
                            if (body[pos+1] == 'n') code += '\n';
                            else if (body[pos+1] == 't') code += '\t';
                            else if (body[pos+1] == 'r') {}
                            else if (body[pos+1] == '"') code += '"';
                            else if (body[pos+1] == '\\') code += '\\';
                            pos += 2;
                        } else {
                            code += body[pos++];
                        }
                    }
                }
            }
            
            // 执行评测
            string result = judge(problemId, language, code);
            
            string response = "HTTP/1.1 200 OK\r\n"
                       "Content-Type: application/json; charset=utf-8\r\n" +
                       corsHeaders +
                       "Content-Length: " + to_string(result.length()) + "\r\n\r\n" + result;
            send(client, response.c_str(), response.length(), 0);
            closesocket(client);
            return;
        }
    }
    
    // 处理静态文件
    string filePath;
    if (request.find("GET / ") == 0 || request.find("GET /index.html") == 0) {
        filePath = BASE_DIR + "/index.html";
    } else if (request.find("GET /style.css") == 0) {
        filePath = BASE_DIR + "/style.css";
    } else if (request.find("GET /script.js") == 0) {
        filePath = BASE_DIR + "/script.js";
    } else {
        // 404
        string notFound = "404 Not Found";
        string response = "HTTP/1.1 404 Not Found\r\n"
                   "Content-Type: text/plain\r\n" +
                   corsHeaders +
                   "Content-Length: " + to_string(notFound.length()) + "\r\n\r\n" + notFound;
        send(client, response.c_str(), response.length(), 0);
        closesocket(client);
        return;
    }
    
    if (fileExists(filePath)) {
        string content = readFile(filePath);
        string contentType;
        if (filePath.find(".html") != string::npos) contentType = "text/html; charset=utf-8";
        else if (filePath.find(".css") != string::npos) contentType = "text/css; charset=utf-8";
        else if (filePath.find(".js") != string::npos) contentType = "application/javascript; charset=utf-8";
        else contentType = "text/plain";
        
        string response = "HTTP/1.1 200 OK\r\n"
                   "Content-Type: " + contentType + "\r\n" +
                   corsHeaders +
                   "Content-Length: " + to_string(content.length()) + "\r\n\r\n" + content;
        send(client, response.c_str(), response.length(), 0);
    }
    
    closesocket(client);
}

// 线程函数：处理客户端请求
DWORD WINAPI handleClientThread(LPVOID lpParam) {
    SOCKET client = (SOCKET)(LPVOID)lpParam;
    handleClient(client);
    return 0;
}

int main() {
    cout << "==========================================" << endl;
    cout << "  MyOJ 评测服务器 v2.0（多线程版）" << endl;
    cout << "==========================================" << endl;
    cout << endl;
    
    // 初始化 Winsock
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        cerr << "WSAStartup 失败" << endl;
        return 1;
    }
    
    // 创建 socket
    SOCKET server = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (server == INVALID_SOCKET) {
        cerr << "创建 socket 失败" << endl;
        WSACleanup();
        return 1;
    }
    
    // 允许地址重用
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));
    
    // 绑定地址
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(3000);
    
    if (bind(server, (sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        cerr << "绑定端口 3000 失败（可能已被占用）" << endl;
        closesocket(server);
        WSACleanup();
        return 1;
    }
    
    // 监听
    if (listen(server, SOMAXCONN) == SOCKET_ERROR) {
        cerr << "监听失败" << endl;
        closesocket(server);
        WSACleanup();
        return 1;
    }
    
    cout << "✅ 服务器启动成功！" << endl;
    cout << "📡 监听地址: http://localhost:3000" << endl;
    cout << "📂 工作目录: " << BASE_DIR << endl;
    cout << "🧵 多线程模式：每个请求独立线程处理" << endl;
    cout << "⏱️  超时保护：死循环代码将被自动终止" << endl;
    cout << endl;
    cout << "按 Ctrl+C 停止服务器" << endl;
    cout << "==========================================" << endl;
    
    // 接受连接
    while (true) {
        SOCKET client = accept(server, NULL, NULL);
        if (client == INVALID_SOCKET) {
            cerr << "接受连接失败" << endl;
            continue;
        }
        
        // 为每个客户端创建独立线程处理
        HANDLE hThread = CreateThread(NULL, 0, handleClientThread, (LPVOID)(LPVOID)client, 0, NULL);
        if (hThread == NULL) {
            cerr << "创建线程失败，直接处理" << endl;
            handleClient(client);
        } else {
            CloseHandle(hThread); // 分离线程，让线程独立运行
        }
    }
    
    closesocket(server);
    WSACleanup();
    return 0;
}