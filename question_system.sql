/*
 Navicat Premium Dump SQL

 Source Server         : question_SYSTEM
 Source Server Type    : MySQL
 Source Server Version : 80045 (8.0.45)
 Source Host           : localhost:3306
 Source Schema         : question_system

 Target Server Type    : MySQL
 Target Server Version : 80045 (8.0.45)
 File Encoding         : 65001

 Date: 05/05/2026 22:39:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for practice_record
-- ----------------------------
DROP TABLE IF EXISTS `practice_record`;
CREATE TABLE `practice_record`  (
  `rid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `qid` int NOT NULL,
  `user_answer` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_correct` tinyint NULL DEFAULT NULL COMMENT '1正确 0错误',
  `practice_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rid`) USING BTREE,
  INDEX `uid`(`uid` ASC) USING BTREE,
  INDEX `qid`(`qid` ASC) USING BTREE,
  CONSTRAINT `practice_record_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `practice_record_ibfk_2` FOREIGN KEY (`qid`) REFERENCES `question` (`qid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of practice_record
-- ----------------------------

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `qid` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '题干',
  `option_a` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `option_b` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `option_c` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `option_d` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `answer` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标准答案 A/B/C/D',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类/章节',
  `difficulty` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '中等',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question
-- ----------------------------

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions`  (
  `question_id` int NOT NULL AUTO_INCREMENT COMMENT '题目ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '题干',
  `option_a` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '选项A',
  `option_b` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '选项B',
  `option_c` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '选项C',
  `option_d` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '选项D',
  `answer` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标准答案（A/B/C/D）',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类（章节或难度）',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`question_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES (1, '以下哪个是 Python 中的关键字？', 'def', 'var', 'int', 'string', 'A', 'Python基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (2, '下列哪个函数用于输出内容到控制台？', 'input()', 'output()', 'print()', 'console()', 'C', 'Python基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (3, 'Python 中用于表示空值的变量是？', 'null', 'undefined', 'None', 'Nil', 'C', 'Python基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (4, '下列哪个用于在 Flask 中定义路由？', '@app.route', '@app.url', '@app.path', '@app.mapping', 'A', 'Flask框架', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (5, 'Flask 默认的 Web 服务器端口是？', '3000', '5000', '8000', '8080', 'B', 'Flask框架', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (6, '在 Flask 中获取 URL 参数的正确方式是？', 'request.args', 'request.form', 'request.data', 'request.params', 'A', 'Flask框架', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (7, 'SQL 中用于从表中选取数据的语句是？', 'GET', 'SELECT', 'UPDATE', 'PULL', 'B', '数据库基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (8, '下列哪个 SQL 语句用于向表中插入数据？', 'ADD INTO', 'INSERT INTO', 'UPDATE INTO', 'CREATE INTO', 'B', '数据库基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (9, '以下哪个是 MySQL 中的聚合函数？', 'SUM()', 'ADD()', 'TOTAL()', 'COUNTUP()', 'A', '数据库基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (10, 'Python 中定义一个类的关键字是？', 'struct', 'class', 'object', 'def', 'B', '面向对象', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (11, '以下哪个用于表示继承关系？', '括号', '冒号', 'extends', 'implements', 'A', '面向对象', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (12, 'HTTP 状态码 404 表示？', '服务器错误', '请求成功', '页面未找到', '禁止访问', 'C', 'Web基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (13, 'HTML 中用于定义无序列表的标签是？', '<ol>', '<li>', '<ul>', '<list>', 'C', 'Web基础', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (14, '以下哪个是版本控制工具？', 'Git', 'Docker', 'Flask', 'MySQL', 'A', '开发工具', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (15, 'Git 中用于提交更改的命令是？', 'git push', 'git add', 'git commit', 'git save', 'C', '开发工具', '2026-05-05 17:20:56');
INSERT INTO `questions` VALUES (16, '以下哪个是 Python 中的关键字？', 'def', 'var', 'int', 'string', 'A', 'Python基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (17, '下列哪个函数用于输出内容到控制台？', 'input()', 'output()', 'print()', 'console()', 'C', 'Python基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (18, 'Python 中用于表示空值的变量是？', 'null', 'undefined', 'None', 'Nil', 'C', 'Python基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (19, '下列哪个用于在 Flask 中定义路由？', '@app.route', '@app.url', '@app.path', '@app.mapping', 'A', 'Flask框架', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (20, 'Flask 默认的 Web 服务器端口是？', '3000', '5000', '8000', '8080', 'B', 'Flask框架', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (21, '在 Flask 中获取 URL 参数的正确方式是？', 'request.args', 'request.form', 'request.data', 'request.params', 'A', 'Flask框架', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (22, 'SQL 中用于从表中选取数据的语句是？', 'GET', 'SELECT', 'UPDATE', 'PULL', 'B', '数据库基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (23, '下列哪个 SQL 语句用于向表中插入数据？', 'ADD INTO', 'INSERT INTO', 'UPDATE INTO', 'CREATE INTO', 'B', '数据库基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (24, '以下哪个是 MySQL 中的聚合函数？', 'SUM()', 'ADD()', 'TOTAL()', 'COUNTUP()', 'A', '数据库基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (25, 'Python 中定义一个类的关键字是？', 'struct', 'class', 'object', 'def', 'B', '面向对象', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (26, '以下哪个用于表示继承关系？', '括号', '冒号', 'extends', 'implements', 'A', '面向对象', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (27, 'HTTP 状态码 404 表示？', '服务器错误', '请求成功', '页面未找到', '禁止访问', 'C', 'Web基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (28, 'HTML 中用于定义无序列表的标签是？', '<ol>', '<li>', '<ul>', '<list>', 'C', 'Web基础', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (29, '以下哪个是版本控制工具？', 'Git', 'Docker', 'Flask', 'MySQL', 'A', '开发工具', '2026-05-05 17:28:30');
INSERT INTO `questions` VALUES (30, 'Git 中用于提交更改的命令是？', 'git push', 'git add', 'git commit', 'git save', 'C', '开发工具', '2026-05-05 17:28:30');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
