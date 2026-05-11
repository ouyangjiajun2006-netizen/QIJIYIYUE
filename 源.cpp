#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <string>
#include <cctype>
#include <mysql.h>
#include <Windows.h>
using namespace std;

MYSQL* conn;
MYSQL_RES* res;
MYSQL_ROW row;
int current_uid = -1;

bool connectDB() {
    conn = mysql_init(NULL);
    if (!mysql_real_connect(conn, "localhost", "root", "065116",
        "question_system", 3306, NULL, 0)) {
        cout << "Database connection failed: " << mysql_error(conn) << endl;
        return false;
    }
    mysql_query(conn, "SET NAMES utf8mb4");
    mysql_set_character_set(conn, "utf8mb4");
    return true;
}

bool registerUser() {
    string username, password;
    cout << "Enter username: ";
    cin >> username;
    cout << "Enter password: ";
    cin >> password;

    char sql[256];
    sprintf(sql, "INSERT INTO user(username, password) VALUES('%s','%s')",
        username.c_str(), password.c_str());

    if (mysql_query(conn, sql)) {
        cout << "Register failed!\n";
        return false;
    }
    cout << "Register success!\n";
    return true;
}

bool loginUser() {
    string username, password;
    cout << "Enter username: ";
    cin >> username;
    cout << "Enter password: ";
    cin >> password;

    char sql[256];
    sprintf(sql, "SELECT uid FROM user WHERE username='%s' AND password='%s'",
        username.c_str(), password.c_str());

    if (mysql_query(conn, sql)) return false;
    res = mysql_store_result(conn);
    if (mysql_num_rows(res) == 0) {
        cout << "Account or password error!\n";
        mysql_free_result(res);
        return false;
    }
    row = mysql_fetch_row(res);
    current_uid = atoi(row[0]);
    cout << "Login success!\n";
    mysql_free_result(res);
    return true;
}

void saveRecord(int qid, char user_ans, int correct) {
    char sql[512];
    sprintf(sql, "INSERT INTO practice_record(uid,qid,user_answer,is_correct,practice_time) VALUES(%d,%d,'%c',%d,NOW())",
        current_uid, qid, user_ans, correct);

    if (mysql_query(conn, sql))
        cout << "Save failed: " << mysql_error(conn) << endl;
    else
        cout << "Record saved!\n";
}

void practice() {
    string sql = "SELECT question_id,content,option_a,option_b,option_c,option_d,answer FROM questions ORDER BY RAND() LIMIT 1";
    mysql_query(conn, sql.c_str());
    res = mysql_store_result(conn);
    if (!res || mysql_num_rows(res) == 0) { cout << "No questions\n"; return; }
    row = mysql_fetch_row(res);

    int qid = atoi(row[0]);
    cout << "\nQuestion:\n" << row[1] << endl;
    cout << "A. " << row[2] << endl;
    cout << "B. " << row[3] << endl;
    cout << "C. " << row[4] << endl;
    cout << "D. " << row[5] << endl;

    char ans;
    cout << "Your answer (A/B/C/D): ";
    cin >> ans;
    ans = toupper(ans);
    int ok = (ans == row[6][0]) ? 1 : 0;

    if (ok) cout << "Correct!\n";
    else cout << "Wrong! Answer: " << row[6] << endl;

    saveRecord(qid, ans, ok);
    mysql_free_result(res);
}

void history() {
    cout << "\n===== Your History =====\n";
    char sql[512];
    sprintf(sql, "SELECT q.content,r.user_answer,r.is_correct,r.practice_time FROM practice_record r JOIN questions q ON r.qid=q.question_id WHERE r.uid=%d ORDER BY r.practice_time DESC", current_uid);
    mysql_query(conn, sql);
    res = mysql_store_result(conn);
    if (mysql_num_rows(res) == 0) { cout << "No records\n"; return; }
    while ((row = mysql_fetch_row(res))) {
        cout << "[" << row[3] << "] " << row[0] << endl;
        cout << "Your answer: " << row[1] << "  " << (atoi(row[2]) ? "Correct" : "Wrong") << "\n-------------------\n";
    }
    mysql_free_result(res);
}

void addQuestion() {
    cin.ignore();
    string content, a, b, c, d, ans, cate;

    cout << "\n===== Add Question =====\n";
    cout << "Content: ";
    getline(cin, content);

    cout << "Option A: ";
    getline(cin, a);

    cout << "Option B: ";
    getline(cin, b);

    cout << "Option C: ";
    getline(cin, c);

    cout << "Option D: ";
    getline(cin, d);

    cout << "Answer (A/B/C/D): ";
    getline(cin, ans);

    cout << "Category: ";
    getline(cin, cate);

    char sql[2048];
    sprintf(sql,
        "INSERT INTO questions(content,option_a,option_b,option_c,option_d,answer,category) "
        "VALUES('%s','%s','%s','%s','%s','%s','%s')",
        content.c_str(), a.c_str(), b.c_str(), c.c_str(), d.c_str(), ans.c_str(), cate.c_str()
    );

    if (mysql_query(conn, sql)) {
        cout << "Add failed: " << mysql_error(conn) << endl;
    }
    else {
        cout << "Question added successfully!\n";
    }
}

void menu() {
    while (true) {
        cout << "\n===== Main Menu =====\n";
        cout << "1. Practice questions\n";
        cout << "2. View history\n";
        cout << "3. Add question\n";
        cout << "4. Logout\n";
        cout << "Choose: ";
        int op; cin >> op;

        if (op == 1) practice();
        else if (op == 2) history();
        else if (op == 3) addQuestion();
        else if (op == 4) { current_uid = -1; break; }
    }
}

void welcome() {
    while (true) {
        cout << "\n===== Welcome =====\n";
        cout << "1. Register\n2. Login\n3. Exit\nChoose: ";
        int op; cin >> op;
        if (op == 1) registerUser();
        else if (op == 2) { if (loginUser()) menu(); }
        else if (op == 3) break;
    }
}

int main() {
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
    system("chcp 65001 > nul");
    ios::sync_with_stdio(false);
    cin.tie(0);

    if (!connectDB()) return -1;
    welcome();
    mysql_close(conn);
    return 0;
}