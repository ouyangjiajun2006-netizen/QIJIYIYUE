-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: question_bank
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT COMMENT '题目ID',
  `content` text NOT NULL COMMENT '题干',
  `option_a` varchar(255) DEFAULT NULL COMMENT '选项A',
  `option_b` varchar(255) DEFAULT NULL COMMENT '选项B',
  `option_c` varchar(255) DEFAULT NULL COMMENT '选项C',
  `option_d` varchar(255) DEFAULT NULL COMMENT '选项D',
  `answer` char(1) NOT NULL COMMENT '标准答案（A/B/C/D）',
  `category` varchar(50) DEFAULT NULL COMMENT '分类（章节或难度）',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'以下哪个是 Python 中的关键字？','def','var','int','string','A','Python基础','2026-05-05 09:20:56'),(2,'下列哪个函数用于输出内容到控制台？','input()','output()','print()','console()','C','Python基础','2026-05-05 09:20:56'),(3,'Python 中用于表示空值的变量是？','null','undefined','None','Nil','C','Python基础','2026-05-05 09:20:56'),(4,'下列哪个用于在 Flask 中定义路由？','@app.route','@app.url','@app.path','@app.mapping','A','Flask框架','2026-05-05 09:20:56'),(5,'Flask 默认的 Web 服务器端口是？','3000','5000','8000','8080','B','Flask框架','2026-05-05 09:20:56'),(6,'在 Flask 中获取 URL 参数的正确方式是？','request.args','request.form','request.data','request.params','A','Flask框架','2026-05-05 09:20:56'),(7,'SQL 中用于从表中选取数据的语句是？','GET','SELECT','UPDATE','PULL','B','数据库基础','2026-05-05 09:20:56'),(8,'下列哪个 SQL 语句用于向表中插入数据？','ADD INTO','INSERT INTO','UPDATE INTO','CREATE INTO','B','数据库基础','2026-05-05 09:20:56'),(9,'以下哪个是 MySQL 中的聚合函数？','SUM()','ADD()','TOTAL()','COUNTUP()','A','数据库基础','2026-05-05 09:20:56'),(10,'Python 中定义一个类的关键字是？','struct','class','object','def','B','面向对象','2026-05-05 09:20:56'),(11,'以下哪个用于表示继承关系？','括号','冒号','extends','implements','A','面向对象','2026-05-05 09:20:56'),(12,'HTTP 状态码 404 表示？','服务器错误','请求成功','页面未找到','禁止访问','C','Web基础','2026-05-05 09:20:56'),(13,'HTML 中用于定义无序列表的标签是？','<ol>','<li>','<ul>','<list>','C','Web基础','2026-05-05 09:20:56'),(14,'以下哪个是版本控制工具？','Git','Docker','Flask','MySQL','A','开发工具','2026-05-05 09:20:56'),(15,'Git 中用于提交更改的命令是？','git push','git add','git commit','git save','C','开发工具','2026-05-05 09:20:56'),(16,'以下哪个是 Python 中的关键字？','def','var','int','string','A','Python基础','2026-05-05 09:28:30'),(17,'下列哪个函数用于输出内容到控制台？','input()','output()','print()','console()','C','Python基础','2026-05-05 09:28:30'),(18,'Python 中用于表示空值的变量是？','null','undefined','None','Nil','C','Python基础','2026-05-05 09:28:30'),(19,'下列哪个用于在 Flask 中定义路由？','@app.route','@app.url','@app.path','@app.mapping','A','Flask框架','2026-05-05 09:28:30'),(20,'Flask 默认的 Web 服务器端口是？','3000','5000','8000','8080','B','Flask框架','2026-05-05 09:28:30'),(21,'在 Flask 中获取 URL 参数的正确方式是？','request.args','request.form','request.data','request.params','A','Flask框架','2026-05-05 09:28:30'),(22,'SQL 中用于从表中选取数据的语句是？','GET','SELECT','UPDATE','PULL','B','数据库基础','2026-05-05 09:28:30'),(23,'下列哪个 SQL 语句用于向表中插入数据？','ADD INTO','INSERT INTO','UPDATE INTO','CREATE INTO','B','数据库基础','2026-05-05 09:28:30'),(24,'以下哪个是 MySQL 中的聚合函数？','SUM()','ADD()','TOTAL()','COUNTUP()','A','数据库基础','2026-05-05 09:28:30'),(25,'Python 中定义一个类的关键字是？','struct','class','object','def','B','面向对象','2026-05-05 09:28:30'),(26,'以下哪个用于表示继承关系？','括号','冒号','extends','implements','A','面向对象','2026-05-05 09:28:30'),(27,'HTTP 状态码 404 表示？','服务器错误','请求成功','页面未找到','禁止访问','C','Web基础','2026-05-05 09:28:30'),(28,'HTML 中用于定义无序列表的标签是？','<ol>','<li>','<ul>','<list>','C','Web基础','2026-05-05 09:28:30'),(29,'以下哪个是版本控制工具？','Git','Docker','Flask','MySQL','A','开发工具','2026-05-05 09:28:30'),(30,'Git 中用于提交更改的命令是？','git push','git add','git commit','git save','C','开发工具','2026-05-05 09:28:30');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 19:39:13
