# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run

```powershell
# Build the judge server
cd judge && make

# Run the server (binds to 0.0.0.0:8080)
cd judge && make run

# Clean build artifacts
cd judge && make clean
```

The Makefile uses MinGW g++ (`-O2 -std=c++11 -lws2_32`). The compiler is expected at `C:/MinGW/bin/g++.exe` or the MSys2 path in config.h.

**Before running**, copy `libmysql.dll` from MySQL Server directory to the `judge/` folder so `LoadLibrary` can find it at runtime:
```powershell
Copy-Item "C:\Program Files\MySQL\MySQL Server 8.0\lib\libmysql.dll" -Destination judge\
```

No test framework, linter, formatter, or CI/CD is configured. The files `test_runner.cpp` and `test_runner2.cpp` at the root are standalone manual test harnesses (compile and run directly).

## Architecture

**Online Judge (OJ) system** — a single Windows executable serving a coding-problem frontend and judging C/C++ submissions.

### Project Structure

- `judge/` — Server source (header-only, compiled via `main.cpp`)
  - `main.cpp` — Entry point, initializes DB and starts HTTP server
  - `http_server.h` — Raw WinSock HTTP server (blocking single-threaded accept loop, routes: `/api/problems`, `/api/problem`, `/api/submit`, `/api/register`, `/api/login`, `/api/history`, static file serving)
  - `judge_core.h` — Compiles submitted code via `_popen(g++ ...)`, runs in sandboxed process (Job Object), compares trimmed output to expected, enforces timeout
  - `database.h` — MySQL 8.0 via dynamic `LoadLibrary("libmysql.dll")`, tables: `users`, `submissions`
  - `utils.h` — File I/O, string utilities, JSON escaping
  - `config.h` — Paths (`BASE_DIR=d:/myojnew`) and MySQL credentials
- `problems/` — 41 problem directories, each with `problem.json`, `input/{1,2,3}.in`, `output/{1,2,3}.out`
- `submissions/` — Runtime submission storage
- `temp/` — Compiled `.exe`, source `.cpp`, output `.tmp` files
- `index.html`, `style.css`, `script.js` — Vanilla JS SPA frontend

### Data Flow

1. Client fetches problem list/problems from `/api/*` → server reads `problems/*/problem.json` and queries MySQL
2. User submits code via `POST /api/submit` → server writes source to `temp/`, compiles with g++, runs against 3 test cases with stdin/stdout pipes
3. Judge statuses: AC > PE > WA > RE > TLE > CE (stored in MySQL `submissions` table)

### Key Details

- MySQL is loaded dynamically at runtime (`LoadLibrary` + `GetProcAddress`), not linked at compile time. Server exits if `libmysql.dll` is not found.
- Process isolation uses Windows Job Objects (`CreateJobObject` + `AssignProcessToJobObject`) to kill child process trees on timeout.
- Static files are served from `FRONTEND_DIR` (same as `BASE_DIR`).
- The `.claude/hooks/stop.ps1` hook gates exiting with unverified code changes unless `.claude/.verified` marker exists.
