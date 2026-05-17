#ifndef JUDGE_CORE_H
#define JUDGE_CORE_H

#include <string>
#include <vector>
#include <cstdlib>
#include <chrono>
#include <thread>
#include <cstdio>
#include <array>
#include <windows.h>
#include <process.h>
#include <tlhelp32.h>
#include "config.h"
#include "utils.h"
#include "database.h"
using namespace std;

struct JudgeResult {
    string status;
    long long timeMs;
    string detail;
    string expected;
    string actual;
};

// 递归终止进程树
void killProcessTree(DWORD pid) {
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snapshot == INVALID_HANDLE_VALUE) return;
    
    PROCESSENTRY32 pe = { sizeof(pe) };
    vector<DWORD> childPids;
    
    if (Process32First(snapshot, &pe)) {
        do {
            if (pe.th32ParentProcessID == pid) {
                childPids.push_back(pe.th32ProcessID);
            }
        } while (Process32Next(snapshot, &pe));
    }
    CloseHandle(snapshot);
    
    for (DWORD childPid : childPids) {
        killProcessTree(childPid);
    }
    
    HANDLE hProcess = OpenProcess(PROCESS_TERMINATE, FALSE, pid);
    if (hProcess != NULL) {
        TerminateProcess(hProcess, 1);
        CloseHandle(hProcess);
    }
}

// 运行进程并检测超时/运行时错误
string runProcess(const string& exePath, const string& inputFile, 
                  const string& outputFile, long long timeLimitMs) {
    STARTUPINFOA si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    
    string fullCmd = "\"" + exePath + "\"";
    SECURITY_ATTRIBUTES sa = { sizeof(sa), NULL, TRUE };
    
    HANDLE hInput = CreateFileA(inputFile.c_str(), GENERIC_READ, FILE_SHARE_READ, &sa,
                                OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    HANDLE hOutput = CreateFileA(outputFile.c_str(), GENERIC_WRITE, FILE_SHARE_READ, &sa,
                                 CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
    
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdInput = hInput;
    si.hStdOutput = hOutput;
    si.hStdError = GetStdHandle(STD_ERROR_HANDLE);
    
    char* cmdLine = new char[fullCmd.length() + 1];
    strcpy(cmdLine, fullCmd.c_str());
    
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
    
    AssignProcessToJobObject(hJob, pi.hProcess);
    ResumeThread(pi.hThread);
    
    DWORD waitResult = WaitForSingleObject(pi.hProcess, (DWORD)timeLimitMs);
    
    if (waitResult == WAIT_TIMEOUT) {
        TerminateJobObject(hJob, 1);
        TerminateProcess(pi.hProcess, 1);
        CloseHandle(hJob); CloseHandle(pi.hProcess); CloseHandle(pi.hThread);
        if (hInput != INVALID_HANDLE_VALUE) CloseHandle(hInput);
        if (hOutput != INVALID_HANDLE_VALUE) CloseHandle(hOutput);
        return "TLE";
    }
    
    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);
    
    CloseHandle(hJob); CloseHandle(pi.hProcess); CloseHandle(pi.hThread);
    if (hInput != INVALID_HANDLE_VALUE) CloseHandle(hInput);
    if (hOutput != INVALID_HANDLE_VALUE) CloseHandle(hOutput);
    
    return (exitCode != 0) ? "RE" : "AC";
}

// 编译代码
string compileCode(const string& sourcePath, const string& outputPath, const string& language) {
    string cmd;
    if (language == "cpp") cmd = "g++ \"" + sourcePath + "\" -o \"" + outputPath + "\" -O2 -std=c++11 2>&1";
    else if (language == "c") cmd = "gcc \"" + sourcePath + "\" -o \"" + outputPath + "\" -O2 -std=c11 2>&1";
    else return "不支持的语言: " + language;
    
    array<char, 4096> buffer;
    string result;
    FILE* pipe = _popen(cmd.c_str(), "r");
    if (!pipe) return "无法启动编译器";
    while (fgets(buffer.data(), buffer.size(), pipe) != nullptr) result += buffer.data();
    int exitCode = _pclose(pipe);
    if (exitCode != 0 || !fileExists(outputPath)) return result.empty() ? "编译失败" : result;
    return "";
}

// 评测单个测试点
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
    
    string actualOutput = trim(readFile(outputFile));
    string expectedOutput = trim(readFile(expectedOutputFile));
    result.expected = expectedOutput;
    result.actual = actualOutput;
    
    if (actualOutput == expectedOutput) {
        result.status = "AC";
        result.detail = "通过";
    } else {
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

// 主评测函数
string judge(int problemId, const string& language, const string& code, int uid = 0) {
    try {
        createDirs(TEMP_DIR);
        createDirs(SUBMISSIONS_DIR);
        
        srand((unsigned int)time(NULL) ^ (unsigned int)GetCurrentThreadId());
        string timestamp = to_string(GetTickCount()) + "_" + to_string(rand() % 10000);
        string sourceFile = TEMP_DIR + "/submission_" + timestamp + "." + (language == "cpp" ? "cpp" : "c");
        string exeFile = TEMP_DIR + "/submission_" + timestamp + ".exe";
        string outputFile = TEMP_DIR + "/output_" + timestamp + ".tmp";
        
        writeFile(sourceFile, code);
        
        // 编译
        string compileError = compileCode(sourceFile, exeFile, language);
        if (!compileError.empty()) {
            string json = "{\"success\":true,\"status\":\"CE\",\"details\":\"" + escapeJson(compileError) + "\",\"passedCases\":0,\"totalCases\":0,\"testCases\":[]}";
            removeFile(sourceFile);
            if (uid > 0) saveSubmission(uid, problemId, language, code, "CE", compileError, 0);
            return json;
        }
        
        // 读取题目配置
        string problemPath = PROBLEMS_DIR + "/" + to_string(problemId);
        string configPath = problemPath + "/problem.json";
        
        ifstream configFile(configPath);
        if (!configFile.is_open()) {
            removeFile(sourceFile); removeFile(exeFile);
            return "{\"success\":false,\"status\":\"ERROR\",\"message\":\"找不到题目配置\"}";
        }
        
        string configJson((istreambuf_iterator<char>(configFile)), istreambuf_iterator<char>());
        
        // 解析测试点数和时间限制
        int testCases = 3;
        long long timeLimit = 1000;
        
        size_t pos = configJson.find("\"testCases\"");
        if (pos != string::npos) {
            pos = configJson.find(":", pos);
            if (pos != string::npos) {
                string numStr;
                pos++;
                while (pos < configJson.length() && isdigit(configJson[pos])) numStr += configJson[pos++];
                if (!numStr.empty()) testCases = stoi(numStr);
            }
        }
        
        pos = configJson.find("\"timeLimit\"");
        if (pos != string::npos) {
            pos = configJson.find(":", pos);
            if (pos != string::npos) {
                string numStr;
                pos++;
                while (pos < configJson.length() && isdigit(configJson[pos])) numStr += configJson[pos++];
                if (!numStr.empty()) timeLimit = stoll(numStr);
            }
        }
        
        // 逐测试点评测
        string overallStatus = "AC";
        int totalTime = 0;
        int passedCases = 0;
        string details;
        vector<JudgeResult> testResults;

        for (int i = 1; i <= testCases; i++) {
            string inputFile = problemPath + "/input/" + to_string(i) + ".in";
            string expectedOutputFile = problemPath + "/output/" + to_string(i) + ".out";

            if (!fileExists(inputFile) || !fileExists(expectedOutputFile)) {
                details += "测试点 #" + to_string(i) + " 数据缺失\n";
                continue;
            }

            JudgeResult result = judgeTestCase(exeFile, inputFile, expectedOutputFile, timeLimit, outputFile);
            testResults.push_back(result);

            if (result.status == "AC") passedCases++;

            details += "测试点 #" + to_string(i) + ": " + result.status;
            if (result.status == "AC") details += " (" + to_string(result.timeMs) + "ms)";
            details += "\n" + result.detail + "\n\n";

            totalTime += (int)result.timeMs;

            // 确定最终状态（优先级：CE > TLE > RE > WA > PE > AC）
            if (result.status != "AC") {
                if (overallStatus == "AC") overallStatus = result.status;
                else if (result.status == "CE") overallStatus = "CE";
                else if (result.status == "TLE" && overallStatus != "CE") overallStatus = "TLE";
                else if (result.status == "RE" && overallStatus != "CE" && overallStatus != "TLE") overallStatus = "RE";
                else if (result.status == "WA" && overallStatus != "CE" && overallStatus != "TLE" && overallStatus != "RE") overallStatus = "WA";
                else if (result.status == "PE" && overallStatus == "AC") overallStatus = "PE";
            }
        }

        // 构建结构化 JSON（含每个测试点的详细数据）
        string testCasesJson = "[";
        for (size_t i = 0; i < testResults.size(); i++) {
            if (i > 0) testCasesJson += ",";
            testCasesJson += "{";
            testCasesJson += "\"id\":" + to_string((int)i + 1) + ",";
            testCasesJson += "\"status\":\"" + testResults[i].status + "\",";
            testCasesJson += "\"timeMs\":" + to_string(testResults[i].timeMs) + ",";
            testCasesJson += "\"detail\":\"" + escapeJson(testResults[i].detail) + "\",";
            testCasesJson += "\"expected\":\"" + escapeJson(testResults[i].expected) + "\",";
            testCasesJson += "\"actual\":\"" + escapeJson(testResults[i].actual) + "\"";
            testCasesJson += "}";
        }
        testCasesJson += "]";

        string json = "{\"success\":true,\"status\":\"" + overallStatus + "\",\"details\":\"" + escapeJson(details) + "\",\"passedCases\":" + to_string(passedCases) + ",\"totalCases\":" + to_string(testCases) + ",\"testCases\":" + testCasesJson + "}";
        
        if (uid > 0) saveSubmission(uid, problemId, language, code, overallStatus, json, totalTime);
        
        // 清理临时文件
        removeFile(sourceFile);
        for (int retry = 0; retry < 5; retry++) {
            if (removeFile(exeFile)) break;
            Sleep(100);
        }
        removeFile(outputFile);
        
        return json;
        
    } catch (const exception& e) {
        return "{\"success\":false,\"status\":\"ERROR\",\"message\":\"" + escapeJson(e.what()) + "\"}";
    }
}

#endif