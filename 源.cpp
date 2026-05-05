#include <iostream>
#include <string>
#include <cctype>
#include <mysql.h>
using namespace std;

MYSQL* conn;
MYSQL_RES* res;
MYSQL_ROW row;

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

void practiceOneQuestion() {
    string sql = "SELECT question_id, content, option_a, option_b, option_c, option_d, answer FROM questions ORDER BY RAND() LIMIT 1";
    if (mysql_query(conn, sql.c_str())) {
        cout << "Query failed: " << mysql_error(conn) << endl;
        return;
    }
    res = mysql_store_result(conn);
    if (!res || mysql_num_rows(res) == 0) {
        cout << "No questions available." << endl;
        return;
    }
    row = mysql_fetch_row(res);

    cout << "\nQuestion:" << endl;
    cout << row[1] << endl;
    cout << "A. " << row[2] << endl;
    cout << "B. " << row[3] << endl;
    cout << "C. " << row[4] << endl;
    cout << "D. " << row[5] << endl;

    char userAns;
    cout << "Enter your answer (A/B/C/D): ";
    cin >> userAns;
    userAns = toupper(userAns);

    if (userAns == row[6][0]) {
        cout << "Correct!" << endl;
    }
    else {
        cout << "Wrong. The correct answer is: " << row[6] << endl;
    }
    mysql_free_result(res);
}

int main() {
    system("chcp 65001 > nul"); // æ≤ƒ¨…Ë÷√UTF-8£¨≤ªœ‘ æActive code page
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    if (!connectDB()) {
        return -1;
    }
    cout << "Connected to database successfully!" << endl;

    while (true) {
        practiceOneQuestion();
        char flag;
        cout << "Continue? (y/n): ";
        cin >> flag;
        if (flag == 'n' || flag == 'N') {
            break;
        }
    }

    mysql_close(conn);
    return 0;
}