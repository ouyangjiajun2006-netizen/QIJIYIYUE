#include <windows.h>
#include <iostream>
#include <string>
using namespace std;
int main() {
    string inputFile = "d:/myoj/problems/1/input/1.in";
    string outputFile = "d:/myoj/temp/test_out.tmp";
    string exePath = "d:/myoj/temp/test_prog.exe";
    
    // 编译一个正常程序
    system("g++ -o d:/myoj/temp/test_prog.exe -x c++ - <<< \"#include <iostream>\\nusing namespace std;\\nint main(){ int a,b; cin>>a>>b; cout<<a+b<<endl; return 0; }\" -O2 2>&1");
    
    SECURITY_ATTRIBUTES sa = { sizeof(sa), NULL, TRUE };
    
    HANDLE hInput = CreateFileA(inputFile.c_str(), GENERIC_READ, FILE_SHARE_READ, &sa, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    cout << "hInput: " << hInput << " (INVALID=" << INVALID_HANDLE_VALUE << ") err=" << GetLastError() << endl;
    
    HANDLE hOutput = CreateFileA(outputFile.c_str(), GENERIC_WRITE, FILE_SHARE_READ, &sa, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
    cout << "hOutput: " << hOutput << " (INVALID=" << INVALID_HANDLE_VALUE << ") err=" << GetLastError() << endl;
    
    STARTUPINFOA si = { sizeof(si) };
    PROCESS_INFORMATION pi;
    string fullCmd = "\"" + exePath + "\"";
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdInput = hInput;
    si.hStdOutput = hOutput;
    si.hStdError = GetStdHandle(STD_ERROR_HANDLE);
    
    char* cmdLine = new char[fullCmd.length() + 1];
    strcpy(cmdLine, fullCmd.c_str());
    
    if (!CreateProcessA(NULL, cmdLine, NULL, NULL, TRUE, CREATE_NO_WINDOW | CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
        cout << "CreateProcess failed: " << GetLastError() << endl;
        return 1;
    }
    delete[] cmdLine;
    
    cout << "Process created, PID: " << pi.dwProcessId << endl;
    ResumeThread(pi.hThread);
    
    DWORD waitResult = WaitForSingleObject(pi.hProcess, 5000);
    cout << "Wait result: " << waitResult << endl;
    
    DWORD exitCode;
    GetExitCodeProcess(pi.hProcess, &exitCode);
    cout << "Exit code: " << exitCode << endl;
    
    CloseHandle(pi.hProcess); CloseHandle(pi.hThread);
    CloseHandle(hInput); CloseHandle(hOutput);
    
    // 读取输出
    ifstream f(outputFile);
    string content((istreambuf_iterator<char>(f)), istreambuf_iterator<char>());
    cout << "Output: [" << content << "]" << endl;
    
    return 0;
}
