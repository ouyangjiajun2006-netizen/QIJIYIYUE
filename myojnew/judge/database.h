#ifndef JUDGE_DATABASE_H
#define JUDGE_DATABASE_H

#include <string>
#include <iostream>
#include <windows.h>
#include "config.h"
using namespace std;

// MySQL 函数指针类型定义
typedef void* (*mysql_init_t)(void*);
typedef int (*mysql_options_t)(void*, int, const void*);
typedef void* (*mysql_real_connect_t)(void*, const char*, const char*, const char*, const char*, unsigned int, const char*, unsigned long);
typedef void (*mysql_close_t)(void*);
typedef int (*mysql_query_t)(void*, const char*);
typedef void* (*mysql_store_result_t)(void*);
typedef unsigned long long (*mysql_num_rows_t)(void*);
typedef char** (*mysql_fetch_row_t)(void*);
typedef void (*mysql_free_result_t)(void*);
typedef const char* (*mysql_error_t)(void*);
typedef unsigned long long (*mysql_insert_id_t)(void*);
typedef unsigned long (*mysql_real_escape_string_t)(void*, char*, const char*, unsigned long);
typedef int (*mysql_set_character_set_t)(void*, const char*);

// MySQL 常量
#define MYSQL_OPT_CONNECT_TIMEOUT 0

// MySQL 库句柄和函数指针
static HMODULE mysqlLib = NULL;
static mysql_init_t mysql_init_fn = NULL;
static mysql_options_t mysql_options_fn = NULL;
static mysql_real_connect_t mysql_real_connect_fn = NULL;
static mysql_close_t mysql_close_fn = NULL;
static mysql_query_t mysql_query_fn = NULL;
static mysql_store_result_t mysql_store_result_fn = NULL;
static mysql_num_rows_t mysql_num_rows_fn = NULL;
static mysql_fetch_row_t mysql_fetch_row_fn = NULL;
static mysql_free_result_t mysql_free_result_fn = NULL;
static mysql_error_t mysql_error_fn = NULL;
static mysql_insert_id_t mysql_insert_id_fn = NULL;
static mysql_real_escape_string_t mysql_real_escape_string_fn = NULL;
static mysql_set_character_set_t mysql_set_character_set_fn = NULL;

// 初始化 MySQL 库
bool initMySQL() {
    if (mysqlLib != NULL) return true;
    
    // 尝试从多个路径加载 libmysql.dll
    const char* paths[] = {
        "C:/Program Files/MySQL/MySQL Server 8.0/lib/libmysql.dll",
        "libmysql.dll",
        "C:/Program Files/MySQL/MySQL Server 8.0/lib/opt/libmysql.dll",
        NULL
    };
    
    for (int i = 0; paths[i] != NULL; i++) {
        mysqlLib = LoadLibraryA(paths[i]);
        if (mysqlLib != NULL) break;
    }
    
    if (mysqlLib == NULL) {
        cerr << "无法加载 libmysql.dll" << endl;
        return false;
    }
    
    // 获取所有函数指针
    mysql_init_fn = (mysql_init_t)GetProcAddress(mysqlLib, "mysql_init");
    mysql_options_fn = (mysql_options_t)GetProcAddress(mysqlLib, "mysql_options");
    mysql_real_connect_fn = (mysql_real_connect_t)GetProcAddress(mysqlLib, "mysql_real_connect");
    mysql_close_fn = (mysql_close_t)GetProcAddress(mysqlLib, "mysql_close");
    mysql_query_fn = (mysql_query_t)GetProcAddress(mysqlLib, "mysql_query");
    mysql_store_result_fn = (mysql_store_result_t)GetProcAddress(mysqlLib, "mysql_store_result");
    mysql_num_rows_fn = (mysql_num_rows_t)GetProcAddress(mysqlLib, "mysql_num_rows");
    mysql_fetch_row_fn = (mysql_fetch_row_t)GetProcAddress(mysqlLib, "mysql_fetch_row");
    mysql_free_result_fn = (mysql_free_result_t)GetProcAddress(mysqlLib, "mysql_free_result");
    mysql_error_fn = (mysql_error_t)GetProcAddress(mysqlLib, "mysql_error");
    mysql_insert_id_fn = (mysql_insert_id_t)GetProcAddress(mysqlLib, "mysql_insert_id");
    mysql_real_escape_string_fn = (mysql_real_escape_string_t)GetProcAddress(mysqlLib, "mysql_real_escape_string");
    mysql_set_character_set_fn = (mysql_set_character_set_t)GetProcAddress(mysqlLib, "mysql_set_character_set");
    
    if (!mysql_init_fn || !mysql_real_connect_fn || !mysql_query_fn || !mysql_close_fn) {
        cerr << "无法获取 MySQL 函数指针" << endl;
        FreeLibrary(mysqlLib);
        mysqlLib = NULL;
        return false;
    }
    
    return true;
}

// 关闭 MySQL 库
void closeMySQL() {
    if (mysqlLib != NULL) {
        FreeLibrary(mysqlLib);
        mysqlLib = NULL;
    }
}

// MySQL 连接结构体（简化版，只包含我们需要的信息）
struct MYSQL_CONN {
    void* conn;
    bool valid;
};

MYSQL_CONN* dbConnect() {
    if (!initMySQL()) return NULL;

    void* conn = mysql_init_fn(NULL);
    if (conn == NULL) {
        cerr << "mysql_init 失败" << endl;
        return NULL;
    }

    int timeout = 5;
    mysql_options_fn(conn, MYSQL_OPT_CONNECT_TIMEOUT, &timeout);

    void* result = mysql_real_connect_fn(conn, DB_HOST.c_str(), DB_USER.c_str(), DB_PASS.c_str(),
                                         DB_NAME.c_str(), DB_PORT, NULL, 0);
    if (result == NULL) {
        cerr << "MySQL 连接失败: " << mysql_error_fn(conn) << endl;
        mysql_close_fn(conn);
        return NULL;
    }

    mysql_set_character_set_fn(conn, "utf8mb4");

    MYSQL_CONN* mc = new MYSQL_CONN;
    mc->conn = conn;
    mc->valid = true;
    return mc;
}

void dbClose(MYSQL_CONN* mc) {
    if (mc && mc->conn) {
        mysql_close_fn(mc->conn);
    }
    delete mc;
}

string dbEscape(MYSQL_CONN* mc, const string& str) {
    if (mc == NULL || mc->conn == NULL) return str;
    char* escaped = new char[str.length() * 2 + 1];
    mysql_real_escape_string_fn(mc->conn, escaped, str.c_str(), str.length());
    string result(escaped);
    delete[] escaped;
    return result;
}

string registerUser(const string& username, const string& password) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "{\"success\":false,\"message\":\"数据库连接失败\"}";
    
    string safeUser = dbEscape(mc, username);
    string safePass = dbEscape(mc, password);
    
    string query = "SELECT uid FROM users WHERE username='" + safeUser + "'";
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) {
        dbClose(mc);
        return "{\"success\":false,\"message\":\"查询失败\"}";
    }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "{\"success\":false,\"message\":\"查询失败\"}"; }
    
    if (mysql_num_rows_fn(result) > 0) {
        mysql_free_result_fn(result); dbClose(mc);
        return "{\"success\":false,\"message\":\"用户名已存在\"}";
    }
    mysql_free_result_fn(result);
    
    query = "INSERT INTO users (username, password) VALUES ('" + safeUser + "','" + safePass + "')";
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) {
        dbClose(mc);
        return "{\"success\":false,\"message\":\"注册失败\"}";
    }
    int uid = (int)mysql_insert_id_fn(mc->conn);
    dbClose(mc);
    return "{\"success\":true,\"message\":\"注册成功\",\"uid\":" + to_string(uid) + ",\"username\":\"" + username + "\"}";
}

string loginUser(const string& username, const string& password) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "{\"success\":false,\"message\":\"数据库连接失败\"}";
    
    string safeUser = dbEscape(mc, username);
    string safePass = dbEscape(mc, password);
    
    string query = "SELECT uid, username FROM users WHERE username='" + safeUser + "' AND password='" + safePass + "'";
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) {
        dbClose(mc);
        return "{\"success\":false,\"message\":\"查询失败\"}";
    }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "{\"success\":false,\"message\":\"查询失败\"}"; }
    
    if (mysql_num_rows_fn(result) == 0) {
        mysql_free_result_fn(result); dbClose(mc);
        return "{\"success\":false,\"message\":\"用户名或密码错误\"}";
    }
    
    char** row = mysql_fetch_row_fn(result);
    int uid = atoi(row[0]);
    string uname = row[1];
    mysql_free_result_fn(result);
    dbClose(mc);
    return "{\"success\":true,\"message\":\"登录成功\",\"uid\":" + to_string(uid) + ",\"username\":\"" + uname + "\"}";
}

void saveSubmission(int uid, int problemId, const string& language, const string& code, 
                    const string& status, const string& detail, int timeMs) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return;
    string safeCode = dbEscape(mc, code);
    string safeDetail = dbEscape(mc, detail);
    string safeLang = dbEscape(mc, language);
    string query = "INSERT INTO submissions (uid, problem_id, language, code, status, detail, time_ms) VALUES (" +
                   to_string(uid) + "," + to_string(problemId) + ",'" + safeLang + "','" + safeCode +
                   "','" + status + "','" + safeDetail + "'," + to_string(timeMs) + ")";
    mysql_query_fn(mc->conn, query.c_str());
    dbClose(mc);
}

string getUserProblems(int uid) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "[]";
    
    string query =
        "SELECT DISTINCT s.problem_id FROM submissions s "
        "WHERE s.uid = " + to_string(uid) + " "
        "ORDER BY s.problem_id ASC";
    
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) { dbClose(mc); return "[]"; }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "[]"; }
    
    string json = "[";
    char** row;
    bool first = true;
    
    while ((row = mysql_fetch_row_fn(result)) != NULL) {
        int pid = atoi(row[0]);
        string configPath = PROBLEMS_DIR + "/" + to_string(pid) + "/problem.json";
        if (fileExists(configPath)) {
            string config = readFile(configPath);
            if (!first) json += ",";
            
            // 获取该题目的最新提交状态
            string statusQuery = "SELECT status, submitted_at FROM submissions WHERE uid = " + to_string(uid) +
                                 " AND problem_id = " + to_string(pid) + " ORDER BY submitted_at DESC LIMIT 1";
            string lastStatus = "UNKNOWN";
            string lastTime = "";
            if (mysql_query_fn(mc->conn, statusQuery.c_str()) == 0) {
                void* sr = mysql_store_result_fn(mc->conn);
                if (sr && mysql_num_rows_fn(sr) > 0) {
                    char** srRow = mysql_fetch_row_fn(sr);
                    lastStatus = srRow[0] ? srRow[0] : "UNKNOWN";
                    lastTime = srRow[1] ? srRow[1] : "";
                }
                if (sr) mysql_free_result_fn(sr);
            }
            
            string problemJson = config;
            if (problemJson.length() > 0 && problemJson[0] == '{') {
                problemJson.insert(1, "\"lastStatus\":\"" + escapeJson(lastStatus) + "\",\"lastTime\":\"" + escapeJson(lastTime) + "\",");
            }
            json += problemJson;
            first = false;
        }
    }
    mysql_free_result_fn(result);
    dbClose(mc);
    json += "]";
    return json;
}

string getPassedProblems(int uid) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "[]";
    
    string query =
        "SELECT DISTINCT s.problem_id FROM submissions s "
        "WHERE s.uid = " + to_string(uid) + " "
        "AND s.status = 'AC' "
        "ORDER BY s.submitted_at DESC";
    
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) { dbClose(mc); return "[]"; }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "[]"; }
    
    string json = "[";
    char** row;
    bool first = true;
    
    while ((row = mysql_fetch_row_fn(result)) != NULL) {
        int pid = atoi(row[0]);
        string configPath = PROBLEMS_DIR + "/" + to_string(pid) + "/problem.json";
        if (fileExists(configPath)) {
            string config = readFile(configPath);
            if (!first) json += ",";
            json += config;
            first = false;
        }
    }
    mysql_free_result_fn(result);
    dbClose(mc);
    json += "]";
    return json;
}

string getLeaderboard() {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "[]";

    string query =
        "SELECT u.uid, u.username, COUNT(DISTINCT s.problem_id) as ac_count "
        "FROM users u "
        "LEFT JOIN submissions s ON u.uid = s.uid AND s.status = 'AC' "
        "GROUP BY u.uid, u.username "
        "ORDER BY ac_count DESC, u.username ASC";

    if (mysql_query_fn(mc->conn, query.c_str()) != 0) { dbClose(mc); return "[]"; }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "[]"; }

    string json = "[";
    char** row;
    bool first = true;
    int rank = 1;

    while ((row = mysql_fetch_row_fn(result)) != NULL) {
        if (!first) json += ",";
        json += "{\"rank\":" + to_string(rank++) +
                ",\"uid\":" + string(row[0] ? row[0] : "0") +
                ",\"username\":\"" + escapeJson(row[1] ? row[1] : "") + "\"" +
                ",\"acCount\":" + string(row[2] ? row[2] : "0") + "}";
        first = false;
    }
    mysql_free_result_fn(result);
    dbClose(mc);
    json += "]";
    return json;
}

string getFailedProblems(int uid) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "[]";
    
    // 修复：使用子查询先获取每个题目的最新提交时间，然后按最新提交时间排序
    string query =
        "SELECT s.problem_id FROM submissions s "
        "WHERE s.uid = " + to_string(uid) + " "
        "AND s.problem_id NOT IN ("
        "    SELECT DISTINCT s2.problem_id FROM submissions s2 "
        "    WHERE s2.uid = " + to_string(uid) + " AND s2.status = 'AC'"
        ") "
        "GROUP BY s.problem_id "
        "ORDER BY MAX(s.submitted_at) DESC";
    
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) { dbClose(mc); return "[]"; }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "[]"; }
    
    string json = "[";
    char** row;
    bool first = true;
    
    while ((row = mysql_fetch_row_fn(result)) != NULL) {
        int pid = atoi(row[0]);
        string configPath = PROBLEMS_DIR + "/" + to_string(pid) + "/problem.json";
        if (fileExists(configPath)) {
            string config = readFile(configPath);
            if (!first) json += ",";
            
            string statusQuery = "SELECT status, submitted_at FROM submissions WHERE uid = " + to_string(uid) +
                                 " AND problem_id = " + to_string(pid) + " ORDER BY submitted_at DESC LIMIT 1";
            string lastStatus = "UNKNOWN";
            string lastTime = "";
            if (mysql_query_fn(mc->conn, statusQuery.c_str()) == 0) {
                void* sr = mysql_store_result_fn(mc->conn);
                if (sr && mysql_num_rows_fn(sr) > 0) {
                    char** srRow = mysql_fetch_row_fn(sr);
                    lastStatus = srRow[0] ? srRow[0] : "UNKNOWN";
                    lastTime = srRow[1] ? srRow[1] : "";
                }
                if (sr) mysql_free_result_fn(sr);
            }
            
            string problemJson = config;
            if (problemJson.length() > 0 && problemJson[0] == '{') {
                problemJson.insert(1, "\"lastStatus\":\"" + escapeJson(lastStatus) + "\",\"lastTime\":\"" + escapeJson(lastTime) + "\",");
            }
            json += problemJson;
            first = false;
        }
    }
    mysql_free_result_fn(result);
    dbClose(mc);
    json += "]";
    return json;
}

string getSubmissionHistory(int uid, int limit = 20) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "[]";
    
    string query = "SELECT sid, problem_id, language, status, detail, time_ms, submitted_at "
                   "FROM submissions WHERE uid = " + to_string(uid) + " ORDER BY submitted_at DESC LIMIT " + to_string(limit);
    
    if (mysql_query_fn(mc->conn, query.c_str()) != 0) { dbClose(mc); return "[]"; }
    void* result = mysql_store_result_fn(mc->conn);
    if (result == NULL) { dbClose(mc); return "[]"; }
    
    string json = "[";
    char** row;
    bool first = true;
    while ((row = mysql_fetch_row_fn(result)) != NULL) {
        if (!first) json += ",";
        json += "{\"sid\":" + string(row[0] ? row[0] : "0") +
                ",\"problemId\":" + string(row[1] ? row[1] : "0") +
                ",\"language\":\"" + escapeJson(row[2] ? row[2] : "") + "\"" +
                ",\"status\":\"" + escapeJson(row[3] ? row[3] : "") + "\"" +
                ",\"detail\":\"" + escapeJson(row[4] ? row[4] : "") + "\"" +
                ",\"timeMs\":" + string(row[5] ? row[5] : "0") +
                ",\"submittedAt\":\"" + escapeJson(row[6] ? row[6] : "") + "\"}";
        first = false;
    }
    mysql_free_result_fn(result);
    dbClose(mc);
    json += "]";
    return json;
}

string getUserStats(int uid) {
    MYSQL_CONN* mc = dbConnect();
    if (mc == NULL) return "{}";

    // 总提交数
    string totalQuery = "SELECT COUNT(*) FROM submissions WHERE uid = " + to_string(uid);
    int total = 0;
    if (mysql_query_fn(mc->conn, totalQuery.c_str()) == 0) {
        void* r = mysql_store_result_fn(mc->conn);
        if (r) { char** row = mysql_fetch_row_fn(r); if (row && row[0]) total = atoi(row[0]); mysql_free_result_fn(r); }
    }

    // AC 数（总 AC 提交次数，与状态分布图保持一致）
    string acQuery = "SELECT COUNT(*) FROM submissions WHERE uid = " + to_string(uid) + " AND status = 'AC'";
    int ac = 0;
    if (mysql_query_fn(mc->conn, acQuery.c_str()) == 0) {
        void* r = mysql_store_result_fn(mc->conn);
        if (r) { char** row = mysql_fetch_row_fn(r); if (row && row[0]) ac = atoi(row[0]); mysql_free_result_fn(r); }
    }

    // 状态分布
    string distQuery = "SELECT status, COUNT(*) as cnt FROM submissions WHERE uid = " + to_string(uid) + " GROUP BY status";
    string distJson;
    if (mysql_query_fn(mc->conn, distQuery.c_str()) == 0) {
        void* r = mysql_store_result_fn(mc->conn);
        if (r) {
            char** row;
            while ((row = mysql_fetch_row_fn(r)) != NULL) {
                if (!distJson.empty()) distJson += ",";
                distJson += "\"" + string(row[0]) + "\":" + string(row[1] ? row[1] : "0");
            }
            mysql_free_result_fn(r);
        }
    }

    // 最近 14 天提交趋势
    string dailyQuery =
        "SELECT DATE(submitted_at) as day, COUNT(*) as cnt "
        "FROM submissions WHERE uid = " + to_string(uid) + " "
        "AND submitted_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) "
        "GROUP BY DATE(submitted_at) ORDER BY day ASC";
    string dailyJson;
    if (mysql_query_fn(mc->conn, dailyQuery.c_str()) == 0) {
        void* r = mysql_store_result_fn(mc->conn);
        if (r) {
            char** row;
            bool first = true;
            while ((row = mysql_fetch_row_fn(r)) != NULL) {
                if (!first) dailyJson += ",";
                dailyJson += "{\"date\":\"" + string(row[0] ? row[0] : "") + "\",\"count\":" + string(row[1] ? row[1] : "0") + "}";
                first = false;
            }
            mysql_free_result_fn(r);
        }
    }

    dbClose(mc);

    string json = "{";
    json += "\"totalSubmissions\":" + to_string(total) + ",";
    json += "\"accepted\":" + to_string(ac) + ",";
    json += "\"failed\":" + to_string(max(0, total - ac)) + ",";
    json += "\"statusDistribution\":{" + distJson + "},";
    json += "\"dailySubmissions\":[" + dailyJson + "]";
    json += "}";
    return json;
}

#endif