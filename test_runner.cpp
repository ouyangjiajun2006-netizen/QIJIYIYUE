#include <windows.h>
#include <iostream>
using namespace std;
int main() {
    string exePath = "d:/myoj/temp/test_prog.exe";
    STARTUPINFOA si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    string fullCmd = "\"" + exePath + "\"";
    SECURITY_ATTRIBUTES sa = { sizeof(sa), NULL, TRUE };
    HANDLE hInput = CreateFileA("nul", GENERIC_READ, FILE_SHARE_READ, &sa, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    HANDLE hOutput = CreateFileA("nul", GENERIC_WRITE, FILE_SHARE_READ, &sa, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdInput = hInput;
    si.hStdOutput = hOutput;
    si.hStdError = GetStdHandle(STD_ERROR_HANDLE);
    char* cmdLine = new char[fullCmd.length() + 1];
    strcpy(cmdLine, fullCmd.c_str());
    cout << "Creating process: " << fullCmd << endl;
    if (!CreateProcessA(NULL, cmdLine, NULL, NULL, TRUE, CREATE_NO_WINDOW | CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
        cout << "CreateProcess failed: " << GetLastError() << endl;
        delete[] cmdLine; return 1;
    }
    delete[] cmdLine;
    cout << "Process created, PID: " << pi.dwProcessId << endl;
    ResumeThread(pi.hThread);
    cout << "Thread resumed, waiting..." << endl;
    DWORD waitResult = WaitForSingleObject(pi.hProcess, 2000);
    cout << "Wait result: " << waitResult << " (TIMEOUT=" << WAIT_TIMEOUT << ")" << endl;
    if (waitResult == WAIT_TIMEOUT) {
        cout << "Timeout! Terminating..." << endl;
        TerminateProcess(pi.hProcess, 1);
    }
    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);
    cout << "Exit code: " << exitCode << endl;
    CloseHandle(pi.hProcess); CloseHandle(pi.hThread);
    if (hInput) CloseHandle(hInput); if (hOutput) CloseHandle(hOutput);
    return 0;
}
