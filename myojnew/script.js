// ===== 题目数据（与服务器端 problem.json 同步） =====
const problems = [
    { id: 1, title: "A+B 问题", difficulty: "简单", description: "输入两个整数 a 和 b，输出它们的和。", sampleInput: "1 2", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 2, title: "判断奇偶", difficulty: "简单", description: "输入一个整数，判断它是奇数还是偶数。如果是奇数输出 odd，如果是偶数输出 even。", sampleInput: "5", sampleOutput: "odd", timeLimit: 1000, memoryLimit: 256 },
    { id: 3, title: "求最大值", difficulty: "简单", description: "输入三个整数，输出其中的最大值。", sampleInput: "3 7 5", sampleOutput: "7", timeLimit: 1000, memoryLimit: 256 },
    { id: 4, title: "阶乘计算", difficulty: "中等", description: "输入一个正整数 n，输出 n! 的值。n! = 1 × 2 × 3 × ... × n。", sampleInput: "5", sampleOutput: "120", timeLimit: 1000, memoryLimit: 256 },
    { id: 5, title: "斐波那契数列", difficulty: "中等", description: "斐波那契数列定义：F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)（n≥3）。输入 n，输出 F(n)。", sampleInput: "6", sampleOutput: "8", timeLimit: 1000, memoryLimit: 256 },
    { id: 6, title: "素数判断", difficulty: "中等", description: "输入一个正整数 n，判断它是否为素数。素数是指大于 1 且只能被 1 和自身整除的自然数。", sampleInput: "7", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 7, title: "冒泡排序", difficulty: "中等", description: "输入 n 个整数，使用冒泡排序将它们按从小到大排序后输出。", sampleInput: "5\n3 1 4 1 5", sampleOutput: "1 1 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 8, title: "最大公约数", difficulty: "中等", description: "输入两个正整数 a 和 b，使用辗转相除法求它们的最大公约数（GCD）。", sampleInput: "12 18", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 9, title: "回文数判断", difficulty: "中等", description: "输入一个正整数，判断它是否为回文数。回文数是指正读和反读都相同的数。", sampleInput: "12321", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 10, title: "二分查找", difficulty: "中等", description: "给定一个已排序（升序）的数组和一个目标值，使用二分查找判断目标值是否在数组中。", sampleInput: "5 3\n1 2 3 4 5", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 11, title: "字符串反转", difficulty: "简单", description: "输入一个字符串，将其反转后输出。", sampleInput: "hello", sampleOutput: "olleh", timeLimit: 1000, memoryLimit: 256 },
    { id: 12, title: "杨辉三角", difficulty: "中等", description: "输入一个正整数 n，输出杨辉三角的前 n 行。杨辉三角第 i 行第 j 个数为 C(i-1, j-1)。", sampleInput: "4", sampleOutput: "1\n1 1\n1 2 1\n1 3 3 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 13, title: "十进制转二进制", difficulty: "简单", description: "输入一个正整数 n，将其转换为二进制数并输出。", sampleInput: "10", sampleOutput: "1010", timeLimit: 1000, memoryLimit: 256 },
    { id: 14, title: "判断闰年", difficulty: "简单", description: "输入一个年份 year，判断是否为闰年。闰年条件：能被 400 整除，或者能被 4 整除但不能被 100 整除。", sampleInput: "2000", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 15, title: "阶乘计算", difficulty: "简单", description: "输入一个正整数 n，计算 n!（n 的阶乘）。n! = 1 × 2 × 3 × ... × n。注意结果可能较大。", sampleInput: "5", sampleOutput: "120", timeLimit: 1000, memoryLimit: 256 },
    { id: 16, title: "斐波那契数列", difficulty: "简单", description: "输入一个正整数 n，输出斐波那契数列的第 n 项。F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)（n≥3）。", sampleInput: "6", sampleOutput: "8", timeLimit: 1000, memoryLimit: 256 },
    { id: 17, title: "素数判断", difficulty: "简单", description: "输入一个正整数 n，判断它是否为素数（质数）。素数是指大于 1 且只能被 1 和自身整除的自然数。", sampleInput: "17", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 18, title: "最大公约数", difficulty: "简单", description: "输入两个正整数 a 和 b，求它们的最大公约数（GCD）。", sampleInput: "12 18", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 19, title: "最小公倍数", difficulty: "简单", description: "输入两个正整数 a 和 b，求它们的最小公倍数（LCM）。", sampleInput: "12 18", sampleOutput: "36", timeLimit: 1000, memoryLimit: 256 },
    { id: 20, title: "回文数判断", difficulty: "简单", description: "输入一个正整数 n，判断它是否为回文数（正着读和倒着读一样）。", sampleInput: "12321", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 21, title: "数字反转", difficulty: "简单", description: "输入一个整数 n，将其数字反转后输出。注意处理负号和前导零（反转后去掉前导零）。", sampleInput: "-1230", sampleOutput: "-321", timeLimit: 1000, memoryLimit: 256 },
    { id: 22, title: "水仙花数", difficulty: "简单", description: "输入一个三位数 n，判断它是否为水仙花数。水仙花数是指一个三位数，其各位数字的立方和等于该数本身。", sampleInput: "153", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 23, title: "完全平方数", difficulty: "简单", description: "输入一个正整数 n，判断它是否为完全平方数（即存在整数 x 使得 x*x = n）。", sampleInput: "16", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 24, title: "冒泡排序", difficulty: "中等", description: "输入 n 个整数，使用冒泡排序将它们按升序排列并输出。", sampleInput: "5\n3 1 4 1 5", sampleOutput: "1 1 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 25, title: "二分查找", difficulty: "中等", description: "给定一个升序排列的数组和一个目标值，使用二分查找判断目标值是否在数组中。", sampleInput: "5 3\n1 2 3 4 5", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 26, title: "字符串反转", difficulty: "简单", description: "输入一个字符串，将其反转后输出。", sampleInput: "hello", sampleOutput: "olleh", timeLimit: 1000, memoryLimit: 256 },
    { id: 27, title: "统计字符", difficulty: "简单", description: "输入一个字符串，统计其中英文字母（大小写共 52 个）、数字、空格和其他字符的个数。", sampleInput: "Hello 123!", sampleOutput: "5 3 1 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 28, title: "数组去重", difficulty: "中等", description: "输入 n 个整数，去除重复的数字后按原顺序输出。", sampleInput: "8\n1 2 3 2 1 4 5 3", sampleOutput: "1 2 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 29, title: "十进制转八进制", difficulty: "简单", description: "将一个十进制正整数转换为八进制数输出。", sampleInput: "100", sampleOutput: "144", timeLimit: 1000, memoryLimit: 256 },
    { id: 30, title: "杨辉三角", difficulty: "中等", description: "输入一个正整数 n，输出杨辉三角的前 n 行。杨辉三角第 i 行第 j 个数为 C(i-1, j-1)，即组合数。", sampleInput: "5", sampleOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 31, title: "括号匹配", difficulty: "中等", description: "输入一个只包含 '('、')'、'['、']'、'{'、'}' 的字符串，判断括号是否匹配。", sampleInput: "({[]})", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 32, title: "最长公共前缀", difficulty: "中等", description: "输入 n 个字符串，找出它们的最长公共前缀。如果没有公共前缀，输出空行。", sampleInput: "3\nflower\nflow\nflight", sampleOutput: "fl", timeLimit: 1000, memoryLimit: 256 },
    { id: 33, title: "合并有序数组", difficulty: "中等", description: "给定两个升序排列的数组，将它们合并为一个升序数组并输出。", sampleInput: "3 4\n1 3 5\n2 4 6 8", sampleOutput: "1 2 3 4 5 6 8", timeLimit: 1000, memoryLimit: 256 },
    { id: 34, title: "约瑟夫环", difficulty: "中等", description: "n 个人围成一圈，从第一个人开始报数，每报到 m 的人出列，求最后剩下的人的编号。", sampleInput: "7 3", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 35, title: "矩阵乘法", difficulty: "中等", description: "给定两个矩阵 A（n×m）和 B（m×k），计算它们的乘积 C = A × B。", sampleInput: "2 3 2\n1 2 3\n4 5 6\n1 2\n3 4\n5 6", sampleOutput: "22 28\n49 64", timeLimit: 1000, memoryLimit: 256 },
    { id: 36, title: "最长递增子序列", difficulty: "困难", description: "给定一个整数数组，找出其中最长的严格递增子序列的长度（LIS）。", sampleInput: "8\n10 9 2 5 3 7 101 18", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 37, title: "最大子数组和", difficulty: "中等", description: "给定一个整数数组，找出一个非空连续子数组，使得子数组元素之和最大。", sampleInput: "9\n-2 1 -3 4 -1 2 1 -5 4", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 38, title: "合并两个有序数组", difficulty: "简单", description: "给定两个升序排列的整数数组，将它们合并为一个升序数组并输出。", sampleInput: "3 4\n1 3 5\n2 4 6 8", sampleOutput: "1 2 3 4 5 6 8", timeLimit: 1000, memoryLimit: 256 },
    { id: 39, title: "回文数判断", difficulty: "简单", description: "给定一个整数 x，判断它是否是回文数。负数不是回文数。", sampleInput: "121", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 40, title: "斐波那契数列", difficulty: "简单", description: "斐波那契数列定义：F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)（n≥3）。给定 n，输出 F(n)。", sampleInput: "6", sampleOutput: "8", timeLimit: 1000, memoryLimit: 256 },
    { id: 41, title: "素数判断", difficulty: "简单", description: "给定一个正整数 n，判断它是否为素数。", sampleInput: "17", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 42, title: "完数判断", difficulty: "简单", description: "输入一个正整数 n，判断它是否为完数（完美数）。完数是指一个数恰好等于它的所有真因子（除了自身以外的因子）之和。", sampleInput: "6", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 43, title: "二进制中1的个数", difficulty: "简单", description: "输入一个非负整数 n，输出其二进制表示中 1 的个数（即 popcount）。", sampleInput: "11", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 44, title: "数字之和", difficulty: "简单", description: "输入一个正整数 n，求其各位数字之和。", sampleInput: "1234", sampleOutput: "10", timeLimit: 1000, memoryLimit: 256 },
    { id: 45, title: "矩阵转置", difficulty: "简单", description: "输入一个 n 行 m 列的矩阵，输出它的转置矩阵（m 行 n 列）。", sampleInput: "2 3\n1 2 3\n4 5 6", sampleOutput: "1 4\n2 5\n3 6", timeLimit: 1000, memoryLimit: 256 },
    { id: 46, title: "选择排序", difficulty: "中等", description: "输入 n 个整数，使用选择排序将它们按从小到大排序后输出。", sampleInput: "6\n64 25 12 22 11 9", sampleOutput: "9 11 12 22 25 64", timeLimit: 1000, memoryLimit: 256 },
    { id: 47, title: "插入排序", difficulty: "中等", description: "输入 n 个整数，使用插入排序将它们按从小到大排序后输出。", sampleInput: "6\n31 41 59 26 53 58", sampleOutput: "26 31 41 53 58 59", timeLimit: 1000, memoryLimit: 256 },
    { id: 48, title: "猴子吃桃", difficulty: "中等", description: "猴子第一天摘下若干个桃子，当即吃了一半，又多吃了一个。以后每天早上都吃了前一天剩下的一半零一个。到第 n 天早上想再吃时，发现只剩下一个桃子。求第一天共摘了多少个桃子。", sampleInput: "4", sampleOutput: "22", timeLimit: 1000, memoryLimit: 256 },
    { id: 49, title: "汉诺塔", difficulty: "简单", description: "汉诺塔问题：有三根柱子 A、B、C，A 柱上有 n 个大小不同的圆盘，大盘在下小盘在上。要求将所有圆盘从 A 柱移动到 C 柱。输出最少的移动次数。", sampleInput: "3", sampleOutput: "7", timeLimit: 1000, memoryLimit: 256 },
    { id: 50, title: "素数筛法", difficulty: "中等", description: "使用埃拉托斯特尼筛法求出 2 到 n 之间所有素数的个数。", sampleInput: "10", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 }
];

let currentProblemId = null;
let isSubmitting = false;
const PAGE_SIZE = 10;
let currentPage = 1;
let currentUser = null;
let filteredProblems = problems;
let currentTab = 'problems';

let monacoEditor = null;
let monacoReady = false;
let monacoRetryCount = 0;
const MONACO_MAX_RETRIES = 3;

try {
    const savedUser = localStorage.getItem('myoj_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
} catch (e) {
    localStorage.removeItem('myoj_user');
}

// 初始化 Monaco 编辑器
function initMonaco() {
    if (monacoEditor) return;
    if (typeof require === 'undefined') {
        monacoRetryCount++;
        if (monacoRetryCount >= MONACO_MAX_RETRIES) {
            initFallbackEditor();
            return;
        }
        setTimeout(initMonaco, 1000);
        return;
    }
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
    require(['vs/editor/editor.main'], function() {
        if (monacoEditor) return;
        const container = document.getElementById('monacoEditor');
        if (!container) return;
        monacoEditor = monaco.editor.create(container, {
            value: '',
            language: 'cpp',
            theme: document.body.classList.contains('dark-mode') ? 'vs-dark' : 'vs',
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 4,
            insertSpaces: true
        });
        monacoReady = true;
    });
    // 如果 Monaco 加载超时（5秒后仍无响应），回退到 textarea
    setTimeout(function() {
        if (!monacoReady && !monacoEditor) {
            initFallbackEditor();
        }
    }, 5000);
}

// Monaco 加载失败时的备用方案：改用 textarea
function initFallbackEditor() {
    const container = document.getElementById('monacoEditor');
    if (!container || container.querySelector('textarea')) return;
    const ta = document.createElement('textarea');
    ta.id = 'codeEditor';
    ta.placeholder = '在此编写你的代码...';
    ta.style.cssText = 'width:100%;height:300px;padding:15px;border:2px solid #ddd;border-radius:8px;font-family:Consolas,monospace;font-size:14px;background:#1e1e1e;color:#d4d4d4;resize:vertical;';
    container.parentNode.replaceChild(ta, container);
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkToggle').textContent = isDark ? '🌙' : '✨';
    localStorage.setItem('myoj_dark', isDark ? '1' : '0');
    if (monacoEditor) {
        monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
    }
}

function applyDarkMode() {
    if (localStorage.getItem('myoj_dark') === '1') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkToggle').textContent = '🌙';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyDarkMode();
    loadProblemList();
    updateUserBar();
    if (currentUser) {
        loadFailedProblems();
        loadPassedProblems();
    }
    loadLeaderboard();
    setTimeout(initMonaco, 500);
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    const tabOrder = ['problems', 'leaderboard', 'history', 'stats'];
    const idx = tabOrder.indexOf(tab);
    const tabs = document.querySelectorAll('.nav-tab');
    if (idx >= 0 && tabs[idx]) tabs[idx].classList.add('active');

    if (tab === 'problems') {
        showPage('pageProblemList');
    } else if (tab === 'leaderboard') {
        showPage('pageLeaderboard');
        loadLeaderboard();
    } else if (tab === 'history') {
        showPage('pageHistory');
        loadHistory();
    } else if (tab === 'stats') {
        showPage('pageStats');
        loadStats();
    }
}

function openProblem(id) {
    selectProblem(id);
    showPage('pageProblemDetail');
}

function goBackToList() {
    showPage('pageProblemList');
    document.getElementById('resultSection').style.display = 'none';
    if (currentUser) {
        loadFailedProblems();
        loadPassedProblems();
    }
}

function updateUserBar() {
    const userInfo = document.getElementById('userInfo');
    const userActions = document.getElementById('userActions');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const tabHistory = document.getElementById('tabHistory');
    const tabStats = document.getElementById('tabStats');
    if (currentUser) {
        userInfo.style.display = 'flex';
        userActions.style.display = 'none';
        userNameDisplay.textContent = currentUser.username;
        tabHistory.style.display = 'inline-block';
        tabStats.style.display = 'inline-block';
    } else {
        userInfo.style.display = 'none';
        userActions.style.display = 'flex';
        tabHistory.style.display = 'none';
        tabStats.style.display = 'none';
    }
}

// ===== 登录/注册弹窗 =====
let authMode = 'login';

function showLogin() {
    authMode = 'login';
    document.getElementById('authModalTitle').textContent = '登录';
    document.getElementById('authSubmitBtn').textContent = '登录';
    document.getElementById('confirmPasswordGroup').style.display = 'none';
    document.getElementById('authError').textContent = '';
    document.getElementById('authUsername').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authConfirmPassword').value = '';
    document.getElementById('authModal').style.display = 'flex';
}

function showRegister() {
    authMode = 'register';
    document.getElementById('authModalTitle').textContent = '注册';
    document.getElementById('authSubmitBtn').textContent = '注册';
    document.getElementById('confirmPasswordGroup').style.display = 'block';
    document.getElementById('authError').textContent = '';
    document.getElementById('authUsername').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authConfirmPassword').value = '';
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('authModal');
    if (e.target === modal) {
        closeAuthModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('authModal').style.display === 'flex') {
        handleAuth();
    }
});

async function handleAuth() {
    const username = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value;
    const errorEl = document.getElementById('authError');
    errorEl.textContent = '';

    if (!username) { errorEl.textContent = '请输入用户名'; return; }
    if (!password) { errorEl.textContent = '请输入密码'; return; }

    if (authMode === 'register') {
        const confirmPassword = document.getElementById('authConfirmPassword').value;
        if (password !== confirmPassword) { errorEl.textContent = '两次输入的密码不一致'; return; }
        if (password.length < 6) { errorEl.textContent = '密码长度不能少于6位'; return; }
    }

    const submitBtn = document.getElementById('authSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = authMode === 'login' ? '登录中...' : '注册中...';

    try {
        const endpoint = authMode === 'login' ? '/api/login' : '/api/register';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        if (result.success) {
            currentUser = { uid: result.uid, username: result.username };
            localStorage.setItem('myoj_user', JSON.stringify(currentUser));
            updateUserBar();
            closeAuthModal();
            loadFailedProblems();
            loadPassedProblems();
        } else {
            errorEl.textContent = result.message || '操作失败';
        }
    } catch (error) {
        errorEl.textContent = '无法连接到服务器，请确保评测服务器已启动';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = authMode === 'login' ? '登录' : '注册';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('myoj_user');
    updateUserBar();
    document.getElementById('failedSection').style.display = 'none';
    document.getElementById('passedSection').style.display = 'none';
    switchTab('problems');
}

// ===== 已通过题目 =====
async function loadPassedProblems() {
    if (!currentUser) {
        document.getElementById('passedSection').style.display = 'none';
        return;
    }
    try {
        const response = await fetch(`/api/passed?uid=${currentUser.uid}`);
        const passedProblems = await response.json();
        const passedSection = document.getElementById('passedSection');
        const passedList = document.getElementById('passedProblemList');
        if (passedProblems && passedProblems.length > 0) {
            passedSection.style.display = 'block';
            passedList.innerHTML = '';
            passedProblems.forEach(problem => {
                const item = document.createElement('div');
                item.className = 'problem-item';
                item.onclick = () => openProblem(problem.id);
                const diffClass = problem.difficulty === '简单' ? 'difficulty-easy' :
                                 problem.difficulty === '困难' ? 'difficulty-hard' : 'difficulty-medium';
                item.innerHTML = `
                    <div class="problem-info">
                        <span class="problem-title">${problem.title}</span>
                        <span class="difficulty ${diffClass}">${problem.difficulty}</span>
                    </div>
                    <div class="problem-meta">
                        <span class="status-tag status-tag-AC">✅ 已通过</span>
                    </div>`;
                passedList.appendChild(item);
            });
        } else {
            passedSection.style.display = 'none';
        }
    } catch (error) {
        console.error('加载已通过题目失败:', error);
    }
}

// ===== 未通过题目 =====
async function loadFailedProblems() {
    if (!currentUser) {
        document.getElementById('failedSection').style.display = 'none';
        return;
    }
    try {
        const response = await fetch(`/api/failed?uid=${currentUser.uid}`);
        const failedProblems = await response.json();
        const failedSection = document.getElementById('failedSection');
        const failedList = document.getElementById('failedProblemList');
        if (failedProblems && failedProblems.length > 0) {
            failedSection.style.display = 'block';
            failedList.innerHTML = '';
            failedProblems.forEach(problem => {
                const item = document.createElement('div');
                item.className = 'problem-item';
                item.onclick = () => openProblem(problem.id);
                const diffClass = problem.difficulty === '简单' ? 'difficulty-easy' :
                                 problem.difficulty === '困难' ? 'difficulty-hard' : 'difficulty-medium';
                const statusText = { 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误', 'UNKNOWN': '未通过' };
                const lastStatus = problem.lastStatus || 'UNKNOWN';
                const statusTagClass = 'status-tag-' + (lastStatus !== 'UNKNOWN' ? lastStatus : 'WA');
                item.innerHTML = `
                    <div class="problem-info">
                        <span class="problem-title">${problem.title}</span>
                        <span class="difficulty ${diffClass}">${problem.difficulty}</span>
                    </div>
                    <div class="problem-meta">
                        <span class="status-tag ${statusTagClass}">${statusText[lastStatus] || '未通过'}</span>
                    </div>`;
                failedList.appendChild(item);
            });
        } else {
            failedSection.style.display = 'none';
        }
    } catch (error) {
        console.error('加载未通过题目失败:', error);
    }
}

// ===== 题目搜索/筛选 =====
function filterProblems() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    const difficulty = document.getElementById('difficultyFilter').value;
    filteredProblems = problems.filter(p => {
        const matchName = !keyword || p.title.toLowerCase().includes(keyword);
        const matchDiff = !difficulty || p.difficulty === difficulty;
        return matchName && matchDiff;
    });
    currentPage = 1;
    loadProblemList();
}

// ===== 题目列表（分页） =====
function loadProblemList() {
    const list = document.getElementById('problemList');
    list.innerHTML = '';
    const totalFiltered = filteredProblems.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, totalFiltered);
    const pageProblems = filteredProblems.slice(start, end);

    if (pageProblems.length === 0) {
        list.innerHTML = '<div class="empty-state">没有找到匹配的题目</div>';
    } else {
        pageProblems.forEach(problem => {
            const item = document.createElement('div');
            item.className = 'problem-item';
            item.onclick = () => openProblem(problem.id);
            const diffClass = problem.difficulty === '简单' ? 'difficulty-easy' :
                             problem.difficulty === '困难' ? 'difficulty-hard' : 'difficulty-medium';
            item.innerHTML = `
                <div class="problem-info">
                    <span class="problem-id">#${problem.id}</span>
                    <span class="problem-title">${problem.title}</span>
                    <span class="difficulty ${diffClass}">${problem.difficulty}</span>
                </div>
                <div class="problem-meta">
                    <span>时间限制: ${problem.timeLimit}ms</span>
                    <span>内存限制: ${problem.memoryLimit}MB</span>
                </div>`;
            list.appendChild(item);
        });
    }

    // 分页控件
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (totalPages > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '上一页';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; loadProblemList(); } };
        pagination.appendChild(prevBtn);

        const pageInfo = document.createElement('span');
        pageInfo.className = 'page-info';
        pageInfo.textContent = `第 ${currentPage} / ${totalPages} 页（共 ${totalFiltered} 题）`;
        pagination.appendChild(pageInfo);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = '下一页';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; loadProblemList(); } };
        pagination.appendChild(nextBtn);
    }
}

// ===== 题目详情 =====
function selectProblem(id) {
    currentProblemId = id;
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    document.getElementById('detailTitle').textContent = `#${problem.id} ${problem.title}`;
    const diffClass = problem.difficulty === '简单' ? 'difficulty-easy' :
                     problem.difficulty === '困难' ? 'difficulty-hard' : 'difficulty-medium';
    document.getElementById('detailDifficulty').className = `difficulty ${diffClass}`;
    document.getElementById('detailDifficulty').textContent = problem.difficulty;
    document.getElementById('detailDescription').textContent = problem.description;
    document.getElementById('detailSampleInput').textContent = problem.sampleInput;
    document.getElementById('detailSampleOutput').textContent = problem.sampleOutput;
    document.getElementById('detailTimeLimit').textContent = `${problem.timeLimit}ms`;
    document.getElementById('detailMemoryLimit').textContent = `${problem.memoryLimit}MB`;
    document.getElementById('resultSection').style.display = 'none';
    if (monacoEditor) {
        monacoEditor.setValue('');
    } else {
        const ed = document.getElementById('codeEditor');
        if (ed) ed.value = '';
    }
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').textContent = '提交代码';
    isSubmitting = false;
}

// ===== 提交代码 =====
async function submitCode() {
    if (isSubmitting) return;
    if (!currentUser) {
        alert('请先登录后再提交代码');
        showLogin();
        return;
    }

    const code = monacoEditor ? monacoEditor.getValue().trim() : (document.getElementById('codeEditor') ? document.getElementById('codeEditor').value.trim() : '');
    if (!code) {
        alert('请先编写代码');
        return;
    }

    // 如果是 Monaco 编辑器，关闭自动建议等弹出框
    if (monacoEditor) {
        monacoEditor.getAction('editor.action.closeFindWidget') || true;
    }

    isSubmitting = true;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '评测中...';

    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'block';
    resultSection.className = 'result-section';
    document.getElementById('resultStatus').textContent = '正在评测...';
    document.getElementById('resultDetail').textContent = '';

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                uid: currentUser.uid,
                problemId: currentProblemId,
                language: "cpp",
                code: code
            })
        });
        const result = await response.json();

        if (result.success) {
            const status = result.status || 'UNKNOWN';
            const statusText = {
                'AC': '通过 (Accepted)',
                'WA': '答案错误 (Wrong Answer)',
                'TLE': '超时 (Time Limit Exceeded)',
                'RE': '运行时错误 (Runtime Error)',
                'CE': '编译错误 (Compilation Error)',
                'PE': '格式错误 (Presentation Error)'
            };
            const statusClass = 'status-' + status;

            document.getElementById('resultStatus').textContent = statusText[status] || status;
            resultSection.className = `result-section ${statusClass}`;

            // 渲染可视化测试点卡片
            const detailContainer = document.getElementById('resultDetail');
            detailContainer.innerHTML = '';

            if (result.testCases && result.testCases.length > 0) {
                const passed = result.passedCases || 0;
                const total = result.totalCases || 0;
                const scoreHtml = `<div class="tc-score">通过 ${passed}/${total} 个测试点</div>`;
                const cardsHtml = result.testCases.map(tc => {
                    const isAC = tc.status === 'AC';
                    const isCE = tc.status === 'CE';
                    const statusClass = 'tc-status-' + tc.status.toLowerCase();
                    return `
                        <div class="tc-card ${statusClass}">
                            <div class="tc-header">
                                <span class="tc-name">测试点 #${tc.id}</span>
                                <span class="tc-badge ${statusClass}">${tc.status}</span>
                                ${tc.timeMs > 0 ? `<span class="tc-time">${tc.timeMs}ms</span>` : ''}
                            </div>
                            ${!isAC && !isCE && (tc.expected || tc.actual) ? `
                                <div class="tc-diff">
                                    <div class="tc-diff-row">
                                        <span class="tc-diff-label">期望输出：</span>
                                        <pre class="tc-diff-content">${escapeHtml(tc.expected)}</pre>
                                    </div>
                                    <div class="tc-diff-row">
                                        <span class="tc-diff-label">实际输出：</span>
                                        <pre class="tc-diff-content">${escapeHtml(tc.actual)}</pre>
                                    </div>
                                </div>
                            ` : ''}
                            ${tc.detail && isCE ? `<div class="tc-detail">${escapeHtml(tc.detail)}</div>` : ''}
                        </div>
                    `;
                }).join('');
                detailContainer.innerHTML = scoreHtml + cardsHtml;
            } else if (result.details) {
                // 旧格式兼容（没有 testCases 数组）
                detailContainer.textContent = result.details;
                if (result.passedCases !== undefined && result.totalCases !== undefined) {
                    detailContainer.textContent += `\n通过测试点: ${result.passedCases}/${result.totalCases}`;
                }
            }

            // 刷新未通过/已通过列表
            loadFailedProblems();
            loadPassedProblems();
        } else {
            document.getElementById('resultStatus').textContent = '提交失败';
            document.getElementById('resultDetail').textContent = result.message || '服务器错误';
            resultSection.className = 'result-section status-UNKNOWN';
        }
    } catch (error) {
        document.getElementById('resultStatus').textContent = '提交失败';
        document.getElementById('resultDetail').textContent = '无法连接到服务器，请确保评测服务器已启动';
        resultSection.className = 'result-section status-UNKNOWN';
    } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = '提交代码';
    }
}

// ===== 排行榜 =====
async function loadLeaderboard() {
    const loading = document.getElementById('leaderboardLoading');
    const list = document.getElementById('leaderboardList');
    loading.style.display = 'block';
    list.style.display = 'none';
    try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        loading.style.display = 'none';
        if (data && data.length > 0) {
            list.style.display = 'block';
            list.innerHTML = '';
            const table = document.createElement('table');
            table.className = 'leaderboard-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>用户</th>
                        <th>通过题数</th>
                    </tr>
                </thead>
                <tbody></tbody>`;
            const tbody = table.querySelector('tbody');
            data.forEach(entry => {
                const isMe = currentUser && entry.uid === currentUser.uid;
                const row = document.createElement('tr');
                row.className = isMe ? 'leaderboard-row-self' : '';
                const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '';
                row.innerHTML = `
                    <td class="rank-cell">${medal || entry.rank}</td>
                    <td class="user-cell">${isMe ? '⭐ ' : ''}${escapeHtml(entry.username)}</td>
                    <td class="ac-cell">${entry.acCount}</td>`;
                tbody.appendChild(row);
            });
            list.appendChild(table);
        } else {
            list.style.display = 'block';
            list.innerHTML = '<div class="empty-state">暂无排行数据</div>';
        }
    } catch (error) {
        loading.style.display = 'none';
        list.style.display = 'block';
        list.innerHTML = '<div class="empty-state">加载排行榜失败</div>';
    }
}

// ===== 提交历史 =====
async function loadHistory() {
    if (!currentUser) {
        switchTab('problems');
        return;
    }
    const loading = document.getElementById('historyLoading');
    const list = document.getElementById('historyList');
    const empty = document.getElementById('historyEmpty');
    loading.style.display = 'block';
    list.style.display = 'none';
    empty.style.display = 'none';
    try {
        const response = await fetch(`/api/history?uid=${currentUser.uid}`);
        const data = await response.json();
        loading.style.display = 'none';
        if (data && data.length > 0) {
            list.style.display = 'block';
            list.innerHTML = '';
            data.forEach(entry => {
                const item = document.createElement('div');
                item.className = 'history-item';
                const statusClass = 'status-tag-' + entry.status;
                const statusMap = { 'AC': '通过', 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误' };
                const problem = problems.find(p => p.id === entry.problemId);
                item.innerHTML = `
                    <div class="history-info">
                        <span class="history-problem">#${entry.problemId} ${problem ? problem.title : '未知题目'}</span>
                        <span class="history-lang">${entry.language}</span>
                        <span class="history-time">${entry.submittedAt || ''}</span>
                    </div>
                    <div class="history-meta">
                        <span class="status-tag ${statusClass}">${statusMap[entry.status] || entry.status}</span>
                        <span class="history-duration">${entry.timeMs}ms</span>
                    </div>`;
                list.appendChild(item);
            });
        } else {
            empty.style.display = 'block';
        }
    } catch (error) {
        loading.style.display = 'none';
        list.style.display = 'block';
        list.innerHTML = '<div class="empty-state">加载提交历史失败</div>';
    }
}

// ===== 代码弹窗 =====
function closeCodeModal() {
    document.getElementById('codeModal').style.display = 'none';
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('codeModal');
    if (e.target === modal) closeCodeModal();
});

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== 统计 =====
async function loadStats() {
    if (!currentUser) { switchTab('problems'); return; }
    try {
        const res = await fetch(`/api/stats?uid=${currentUser.uid}`);
        const data = await res.json();

        document.querySelector('#statTotal .stat-number').textContent = data.totalSubmissions || 0;
        document.querySelector('#statTotal').className = 'stat-card';
        document.querySelector('.stat-ac .stat-number').textContent = data.accepted || 0;
        document.querySelector('.stat-wa .stat-number').textContent = data.failed || 0;
        const rate = data.totalSubmissions > 0 ? Math.round(data.accepted / data.totalSubmissions * 100) : 0;
        document.getElementById('statRate').textContent = rate + '%';

        // 状态分布图 - 纯 HTML/CSS
        const dist = data.statusDistribution || {};
        const statusContainer = document.getElementById('statusChart');
        statusContainer.innerHTML = '';
        const labelsMap = { 'AC': '通过', 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误' };
        const colorsMap = { 'AC': '#28a745', 'WA': '#dc3545', 'TLE': '#ffc107', 'RE': '#fd7e14', 'CE': '#17a2b8', 'PE': '#6f42c1' };
        const distKeys = Object.keys(dist);
        const totalCount = distKeys.reduce((s, k) => s + dist[k], 0);

        if (totalCount === 0) {
            statusContainer.innerHTML = '<div class="chart-empty">暂无评测记录</div>';
        } else {
            // CSS 环形图
            const segments = distKeys.map(k => `${colorsMap[k] || '#888'} ${dist[k] / totalCount * 360}deg`).join(', ');
            const donutHtml = `
                <div class="donut-wrapper">
                    <div class="donut" style="background: conic-gradient(${segments});">
                        <div class="donut-hole">
                            <span class="donut-total">${totalCount}</span>
                            <span class="donut-label">总提交</span>
                        </div>
                    </div>
                    <div class="donut-legend">
                        ${distKeys.map(k => `
                            <div class="donut-legend-item">
                                <span class="donut-dot" style="background:${colorsMap[k] || '#888'}"></span>
                                <span class="donut-text">${labelsMap[k] || k}</span>
                                <span class="donut-count">${dist[k]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            statusContainer.innerHTML = donutHtml;
        }

        // 提交趋势图 - 纯 HTML/CSS 柱状图
        const daily = data.dailySubmissions || [];
        const trendContainer = document.getElementById('trendChart');
        trendContainer.innerHTML = '';
        if (daily.length === 0) {
            trendContainer.innerHTML = '<div class="chart-empty">暂无提交记录</div>';
        } else {
            const maxCount = Math.max(...daily.map(d => d.count), 1);
            const barChartHtml = `
                <div class="barchart">
                    ${daily.map(d => `
                        <div class="barchart-col">
                            <div class="barchart-bar-wrap">
                                <div class="barchart-bar" style="height:${(d.count / maxCount) * 100}%"></div>
                            </div>
                            <div class="barchart-label">${d.date ? d.date.substring(5) : ''}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            trendContainer.innerHTML = barChartHtml;
        }
    } catch (e) {
        console.error('加载统计失败:', e);
    }
}
