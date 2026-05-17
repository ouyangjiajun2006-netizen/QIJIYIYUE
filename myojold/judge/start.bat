@echo off
chcp 65001 >nul
title MyOJ 评测服务器

echo ========================================
echo   MyOJ 评测服务器启动器
echo ========================================
echo.

:: 设置 MySQL 路径（请根据你的安装路径修改）
set MYSQL_DIR=C:\Program Files\MySQL\MySQL Server 8.0
set MYSQL_INC=%MYSQL_DIR%\include
set MYSQL_LIB=%MYSQL_DIR%\lib
set MYSQL_BIN=%MYSQL_DIR%\bin

:: 第一步：初始化数据库
echo [步骤 1/3] 初始化数据库...
echo 正在连接 MySQL 并创建数据库和表...
"%MYSQL_BIN%\mysql" -u root -pAsd123789! < init.sql 2>nul

if %ERRORLEVEL% NEQ 0 (
    echo [警告] 数据库初始化可能失败，请手动执行：
    echo   mysql -u root -p ^< init.sql
    echo.
    echo 或者检查 MySQL 服务是否已启动。
    echo.
) else (
    echo 数据库初始化成功！
)
echo.

:: 第二步：编译
echo [步骤 2/3] 编译评测程序...
g++ -O2 -std=c++11 -I%MYSQL_INC% -I. main.cpp -o judge_server.exe -L%MYSQL_LIB% -lmysqlclient -lws2_32

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 编译失败！
    echo 请确保已安装：
    echo   - MinGW-w64 (g++)
    echo   - MySQL Connector/C (libmysqlclient.a)
    echo.
    pause
    exit /b 1
)

echo 编译成功！
echo.

:: 第三步：运行
echo [步骤 3/3] 启动评测服务器...
echo.
echo 服务器将在 http://localhost:8080 启动
echo 按 Ctrl+C 停止服务器
echo.

judge_server.exe

pause