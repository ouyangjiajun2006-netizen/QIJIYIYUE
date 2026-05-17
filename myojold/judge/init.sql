-- MyOJ 数据库初始化脚本
-- 请先确保 MySQL 服务已启动

-- 创建数据库
CREATE DATABASE IF NOT EXISTS myoj DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE myoj;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 提交记录表
CREATE TABLE IF NOT EXISTS submissions (
    sid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    problem_id INT NOT NULL,
    language VARCHAR(10) NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'PD',
    detail TEXT,
    time_ms INT DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
    INDEX idx_uid (uid),
    INDEX idx_problem_id (problem_id),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入测试用户（密码明文存储，仅用于演示）
INSERT INTO users (username, password) VALUES ('admin', 'admin123') ON DUPLICATE KEY UPDATE username=username;
INSERT INTO users (username, password) VALUES ('test', 'test123') ON DUPLICATE KEY UPDATE username=username;

-- 插入一些示例提交记录（使用英文避免编码问题）
INSERT INTO submissions (uid, problem_id, language, code, status, detail, time_ms) VALUES
(1, 1, 'cpp', '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}', 'AC', '{"results":[{"status":"AC","time":5,"detail":"Passed"}]}', 5),
(1, 2, 'cpp', '#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    cout << (n % 2 == 0 ? "even" : "odd") << endl;\n    return 0;\n}', 'AC', '{"results":[{"status":"AC","time":3,"detail":"Passed"}]}', 3),
(2, 1, 'cpp', '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a - b << endl;\n    return 0;\n}', 'WA', '{"results":[{"status":"WA","time":2,"detail":"Wrong Answer\\nExpected:\\n3\\nGot:\\n-1"}]}', 2);