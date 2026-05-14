#ifndef JUDGE_UTILS_H
#define JUDGE_UTILS_H

#include <string>
#include <fstream>
#include <sstream>
#include <direct.h>
#include <sys/stat.h>
#include <cctype>
using namespace std;

bool fileExists(const string& path) {
    struct stat buffer;
    return (stat(path.c_str(), &buffer) == 0);
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

bool endsWith(const string& str, const string& suffix) {
    if (str.length() < suffix.length()) return false;
    return str.compare(str.length() - suffix.length(), suffix.length(), suffix) == 0;
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

#endif