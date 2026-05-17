#include <windows.h>
#include <iostream>
#include <string>
using namespace std;

typedef void* (*mysql_init_t)(void*);
typedef void* (*mysql_real_connect_t)(void*, const char*, const char*, const char*, const char*, unsigned int, const char*, unsigned long);
typedef void (*mysql_close_t)(void*);
typedef const char* (*mysql_error_t)(void*);
typedef int (*mysql_options_t)(void*, int, const void*);
#define MYSQL_OPT_CONNECT_TIMEOUT 0

int main() {
    HMODULE lib = LoadLibraryA("libmysql.dll");
    if (!lib) {
        lib = LoadLibraryA("C:/Program Files/MySQL/MySQL Server 8.0/lib/libmysql.dll");
    }
    if (!lib) {
        cout << "FAIL: cannot load libmysql.dll" << endl;
        return 1;
    }
    cout << "OK: libmysql.dll loaded" << endl;

    auto init_fn = (mysql_init_t)GetProcAddress(lib, "mysql_init");
    auto connect_fn = (mysql_real_connect_t)GetProcAddress(lib, "mysql_real_connect");
    auto close_fn = (mysql_close_t)GetProcAddress(lib, "mysql_close");
    auto error_fn = (mysql_error_t)GetProcAddress(lib, "mysql_error");
    auto options_fn = (mysql_options_t)GetProcAddress(lib, "mysql_options");

    if (!init_fn || !connect_fn || !close_fn || !error_fn) {
        cout << "FAIL: cannot get function pointers" << endl;
        return 1;
    }
    cout << "OK: function pointers loaded" << endl;

    void* conn = init_fn(NULL);
    if (!conn) {
        cout << "FAIL: mysql_init returned NULL" << endl;
        return 1;
    }
    cout << "OK: mysql_init succeeded" << endl;

    int timeout = 5;
    options_fn(conn, MYSQL_OPT_CONNECT_TIMEOUT, &timeout);

    // 测试密码 Asd123789! (ASCII)
    void* result = connect_fn(conn, "127.0.0.1", "root", "Asd123789!", "myoj", 3306, NULL, 0);
    if (result) {
        cout << "OK: ASCII password WORKS!" << endl;
    } else {
        cout << "FAIL with ASCII !: " << error_fn(conn) << endl;
    }
    close_fn(conn);

    // 再测试一次
    conn = init_fn(NULL);
    options_fn(conn, MYSQL_OPT_CONNECT_TIMEOUT, &timeout);
    // 测试密码 Asd123789！(Chinese full-width)
    result = connect_fn(conn, "127.0.0.1", "root", "Asd123789\xEF\xBC\x81", "myoj", 3306, NULL, 0);
    if (result) {
        cout << "OK: Chinese ！ password WORKS!" << endl;
    } else {
        cout << "FAIL with Chinese ！: " << error_fn(conn) << endl;
    }
    close_fn(conn);

    // 测试 ojuser (和服务器完全相同的配置)
    conn = init_fn(NULL);
    options_fn(conn, MYSQL_OPT_CONNECT_TIMEOUT, &timeout);
    result = connect_fn(conn, "127.0.0.1", "ojuser", "Asd123789!", "myoj", 3306, NULL, 0);
    if (result) {
        cout << "OK: ojuser WORKS!" << endl;
    } else {
        cout << "FAIL with ojuser: " << error_fn(conn) << endl;
    }
    close_fn(conn);

    FreeLibrary(lib);
    return 0;
}
