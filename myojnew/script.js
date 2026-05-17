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
    { id: 15, title: "两数之和", difficulty: "简单", description: "给定一个整数数组 nums 和一个目标值 target，请在数组中找出两个数，使它们的和等于 target，并输出这两个数的下标（从1开始）。假设每种输入只有一个解。", sampleInput: "4 9\n2 7 11 15", sampleOutput: "1 2", timeLimit: 1000, memoryLimit: 256 },
    { id: 16, title: "爬楼梯", difficulty: "简单", description: "假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。问有多少种不同的方法可以爬到楼顶。", sampleInput: "3", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 17, title: "快乐数", difficulty: "简单", description: "对于一个正整数，每一次将其替换为每个位置上的数字的平方和，重复这个过程。如果最终能得到 1，则这个数是快乐数。判断一个数是否为快乐数。", sampleInput: "19", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 18, title: "移动零", difficulty: "简单", description: "给定一个整数数组，将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序不变。", sampleInput: "5\n0 1 0 3 12", sampleOutput: "1 3 12 0 0", timeLimit: 1000, memoryLimit: 256 },
    { id: 19, title: "最小公倍数", difficulty: "简单", description: "输入两个正整数 a 和 b，求它们的最小公倍数（LCM）。", sampleInput: "12 18", sampleOutput: "36", timeLimit: 1000, memoryLimit: 256 },
    { id: 20, title: "加一", difficulty: "简单", description: "给定一个由整数组成的非空数组，每个元素表示一个整数的一位（从高位到低位），将该整数加一后，输出新的数组。", sampleInput: "3\n1 2 3", sampleOutput: "1 2 4", timeLimit: 1000, memoryLimit: 256 },
    { id: 21, title: "数字反转", difficulty: "简单", description: "输入一个整数 n，将其数字反转后输出。注意处理负号和前导零（反转后去掉前导零）。", sampleInput: "-1230", sampleOutput: "-321", timeLimit: 1000, memoryLimit: 256 },
    { id: 22, title: "水仙花数", difficulty: "简单", description: "输入一个三位数 n，判断它是否为水仙花数。水仙花数是指一个三位数，其各位数字的立方和等于该数本身。", sampleInput: "153", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 23, title: "完全平方数", difficulty: "简单", description: "输入一个正整数 n，判断它是否为完全平方数（即存在整数 x 使得 x*x = n）。", sampleInput: "16", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 24, title: "快速排序", difficulty: "中等", description: "输入 n 个整数，使用快速排序（Quick Sort）将它们按从小到大排序后输出。", inputDesc: "第一行一个整数 n（1 <= n <= 100000）。第二行 n 个整数（绝对值不超过 10^9），用空格分隔。", outputDesc: "一行，n 个整数，表示排序后的结果，从小到大排列，用空格分隔。", sampleInput: "5\n3 1 4 1 5", sampleOutput: "1 1 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 25, title: "搜索插入位置", difficulty: "中等", description: "给定一个升序排列的整数数组和一个目标值，如果目标值在数组中，返回其下标（从1开始）。如果不在，返回它应该被插入的位置下标（从1开始）。", sampleInput: "4 5\n1 3 5 6", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 26, title: "第一个唯一字符", difficulty: "简单", description: "给定一个字符串，找到其中第一个不重复的字符，并返回其下标（从1开始）。如果不存在，返回 -1。", sampleInput: "leetcode", sampleOutput: "1", timeLimit: 1000, memoryLimit: 256 },
    { id: 27, title: "统计字符", difficulty: "简单", description: "输入一个字符串，统计其中英文字母（大小写共 52 个）、数字、空格和其他字符的个数。", sampleInput: "Hello 123!", sampleOutput: "5 3 1 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 28, title: "数组去重", difficulty: "中等", description: "输入 n 个整数，去除重复的数字后按原顺序输出。", sampleInput: "8\n1 2 3 2 1 4 5 3", sampleOutput: "1 2 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 29, title: "十进制转八进制", difficulty: "简单", description: "将一个十进制正整数转换为八进制数输出。", sampleInput: "100", sampleOutput: "144", timeLimit: 1000, memoryLimit: 256 },
    { id: 30, title: "买卖股票的最佳时机", difficulty: "中等", description: "给定一个数组，第 i 个元素表示某只股票第 i 天的价格。只允许完成一笔交易（买入一次、卖出一次），求能获得的最大利润。", sampleInput: "6\n7 1 5 3 6 4", sampleOutput: "5", timeLimit: 1000, memoryLimit: 256 },
    { id: 31, title: "括号匹配", difficulty: "中等", description: "输入一个只包含 '('、')'、'['、']'、'{'、'}' 的字符串，判断括号是否匹配。", sampleInput: "({[]})", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 32, title: "最长公共前缀", difficulty: "中等", description: "输入 n 个字符串，找出它们的最长公共前缀。如果没有公共前缀，输出空行。", sampleInput: "3\nflower\nflow\nflight", sampleOutput: "fl", timeLimit: 1000, memoryLimit: 256 },
    { id: 33, title: "合并有序数组", difficulty: "中等", description: "给定两个升序排列的数组，将它们合并为一个升序数组并输出。", sampleInput: "3 4\n1 3 5\n2 4 6 8", sampleOutput: "1 2 3 4 5 6 8", timeLimit: 1000, memoryLimit: 256 },
    { id: 34, title: "约瑟夫环", difficulty: "中等", description: "n 个人围成一圈，从第一个人开始报数，每报到 m 的人出列，求最后剩下的人的编号。", sampleInput: "7 3", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 35, title: "矩阵乘法", difficulty: "中等", description: "给定两个矩阵 A（n×m）和 B（m×k），计算它们的乘积 C = A × B。", sampleInput: "2 3 2\n1 2 3\n4 5 6\n1 2\n3 4\n5 6", sampleOutput: "22 28\n49 64", timeLimit: 1000, memoryLimit: 256 },
    { id: 36, title: "最长递增子序列", difficulty: "困难", description: "给定一个整数数组，找出其中最长的严格递增子序列的长度（LIS）。", sampleInput: "8\n10 9 2 5 3 7 101 18", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 37, title: "最大子数组和", difficulty: "中等", description: "给定一个整数数组，找出一个非空连续子数组，使得子数组元素之和最大。", sampleInput: "9\n-2 1 -3 4 -1 2 1 -5 4", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 38, title: "Excel表列名称", difficulty: "简单", description: "给定一个正整数，返回它在 Excel 表中对应的列名称。规则：1→A, 2→B, ..., 26→Z, 27→AA, 28→AB, ...", sampleInput: "28", sampleOutput: "AB", timeLimit: 1000, memoryLimit: 256 },
    { id: 39, title: "有效的字母异位词", difficulty: "简单", description: "给定两个字符串 s 和 t，判断 t 是否是 s 的字母异位词（即两个字符串包含的字母及每个字母的出现次数都相同）。", sampleInput: "anagram\nnagaram", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 40, title: "反转整数", difficulty: "简单", description: "给定一个 32 位有符号整数，将它的每一位数字反转。如果反转后超出范围 [-2^31, 2^31-1]，则输出 0。", sampleInput: "123", sampleOutput: "321", timeLimit: 1000, memoryLimit: 256 },
    { id: 41, title: "各位相加", difficulty: "简单", description: "给定一个非负整数，反复将它的各位数字相加，直到得到一位数为止。", sampleInput: "38", sampleOutput: "2", timeLimit: 1000, memoryLimit: 256 },
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
    document.getElementById('darkToggle').textContent = isDark ? '☀' : '☽';
    localStorage.setItem('myoj_dark', isDark ? '1' : '0');
    if (monacoEditor) {
        monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
    }
}

function applyDarkMode() {
    if (localStorage.getItem('myoj_dark') === '1') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkToggle').textContent = '☀';
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
    document.querySelectorAll('.cf-nav-link').forEach(t => t.classList.remove('active'));
    const tabOrder = ['problems', 'leaderboard', 'failed', 'history', 'stats'];
    const idx = tabOrder.indexOf(tab);
    const tabs = document.querySelectorAll('.cf-nav-link');
    if (idx >= 0 && tabs[idx]) tabs[idx].classList.add('active');

    if (tab === 'problems') {
        showPage('pageProblemList');
        if (currentUser) {
            loadFailedProblems();
            loadPassedProblems();
        }
    } else if (tab === 'leaderboard') {
        showPage('pageLeaderboard');
        loadLeaderboard();
    } else if (tab === 'failed') {
        showPage('pageFailed');
        loadFailedPage();
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
    const tabFailed = document.getElementById('tabFailed');
    const userAvatar = document.getElementById('userAvatar');
    if (currentUser) {
        userInfo.style.display = 'flex';
        userActions.style.display = 'none';
        userNameDisplay.textContent = currentUser.username;
        if (userAvatar) userAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
        tabHistory.style.display = 'inline-block';
        tabStats.style.display = 'inline-block';
        tabFailed.style.display = 'inline-block';
    } else {
        userInfo.style.display = 'none';
        userActions.style.display = 'flex';
        tabHistory.style.display = 'none';
        tabStats.style.display = 'none';
        tabFailed.style.display = 'none';
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
                item.className = 'cf-history-item';
                item.onclick = () => openProblem(problem.id);
                item.style.cursor = 'pointer';
                const diffClass = problem.difficulty === '简单' ? 'cf-tag-easy' :
                                 problem.difficulty === '困难' ? 'cf-tag-hard' : 'cf-tag-medium';
                item.innerHTML = `
                    <div class="cf-history-info">
                        <span class="cf-history-title">${problem.title}</span>
                        <span class="cf-tag ${diffClass}" style="font-size:11px;padding:1px 8px;">${problem.difficulty}</span>
                    </div>
                    <div class="cf-history-meta">
                        <span class="cf-status-tag cf-status-tag-ac">已通过</span>
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
                item.className = 'cf-history-item';
                item.onclick = () => openProblem(problem.id);
                item.style.cursor = 'pointer';
                const diffClass = problem.difficulty === '简单' ? 'cf-tag-easy' :
                                 problem.difficulty === '困难' ? 'cf-tag-hard' : 'cf-tag-medium';
                const statusText = { 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误', 'UNKNOWN': '未通过' };
                const lastStatus = problem.lastStatus || 'UNKNOWN';
                const statusTagClass = 'cf-status-tag-' + (lastStatus !== 'UNKNOWN' ? lastStatus.toLowerCase() : 'wa');
                item.innerHTML = `
                    <div class="cf-history-info">
                        <span class="cf-history-title">${problem.title}</span>
                        <span class="cf-tag ${diffClass}" style="font-size:11px;padding:1px 8px;">${problem.difficulty}</span>
                    </div>
                    <div class="cf-history-meta">
                        <span class="cf-status-tag ${statusTagClass}">${statusText[lastStatus] || '未通过'}</span>
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

// ===== 错题页（完整列表） =====
async function loadFailedPage() {
    const container = document.getElementById('failedFullList');
    const empty = document.getElementById('failedEmpty');
    container.innerHTML = '<div class="cf-loading">加载中...</div>';
    empty.style.display = 'none';
    try {
        const response = await fetch(`/api/failed?uid=${currentUser.uid}`);
        const rawText = await response.text();
        let failedProblems;
        try {
            failedProblems = JSON.parse(rawText);
        } catch (e) {
            console.error('错题页-原始响应:', rawText);
            console.error('响应长度:', rawText.length, '前300字符:', rawText.substring(0, 300));
            throw e;
        }
        if (failedProblems && failedProblems.length > 0) {
            container.innerHTML = '';
            empty.style.display = 'none';
            failedProblems.forEach(problem => {
                const item = document.createElement('div');
                item.className = 'cf-history-item';
                item.onclick = () => openProblem(problem.id);
                item.style.cursor = 'pointer';
                const diffClass = problem.difficulty === '简单' ? 'cf-tag-easy' :
                                 problem.difficulty === '困难' ? 'cf-tag-hard' : 'cf-tag-medium';
                const statusText = { 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误', 'UNKNOWN': '未通过' };
                const lastStatus = problem.lastStatus || 'UNKNOWN';
                const statusTagClass = 'cf-status-tag-' + (lastStatus !== 'UNKNOWN' ? lastStatus.toLowerCase() : 'wa');
                item.innerHTML = `
                    <div class="cf-history-info">
                        <span class="cf-history-title">${problem.title}</span>
                        <span class="cf-tag ${diffClass}" style="font-size:11px;padding:1px 8px;">${problem.difficulty}</span>
                    </div>
                    <div class="cf-history-meta">
                        <span class="cf-status-tag ${statusTagClass}">${statusText[lastStatus] || '未通过'}</span>
                    </div>`;
                container.appendChild(item);
            });
        } else {
            container.innerHTML = '';
            empty.style.display = 'block';
        }
    } catch (error) {
        container.innerHTML = '<div class="cf-empty">加载失败，请检查服务器</div>';
        console.error('加载错题页失败:', error);
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
        list.innerHTML = '<div class="cf-empty">没有找到匹配的题目</div>';
    } else {
        const table = document.createElement('table');
        table.className = 'cf-problems';
        table.innerHTML = `<thead><tr>
            <th></th><th>题目</th><th>难度</th><th>时间</th><th>内存</th>
        </tr></thead><tbody></tbody>`;
        const tbody = table.querySelector('tbody');
        pageProblems.forEach(problem => {
            const tr = document.createElement('tr');
            const diffClass = problem.difficulty === '简单' ? 'cf-tag-easy' :
                             problem.difficulty === '困难' ? 'cf-tag-hard' : 'cf-tag-medium';
            const diffText = problem.difficulty;
            tr.innerHTML = `
                <td class="cf-id">${problem.id}</td>
                <td class="cf-title">${problem.title}</td>
                <td class="cf-diff"><span class="cf-tag ${diffClass}">${diffText}</span></td>
                <td>${problem.timeLimit}ms</td>
                <td>${problem.memoryLimit}MB</td>`;
            tr.onclick = () => openProblem(problem.id);
            tr.style.cursor = 'pointer';
            tbody.appendChild(tr);
        });
        list.appendChild(table);
    }

    // 分页控件
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (totalPages > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'cf-page-btn';
        prevBtn.textContent = '上一页';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; loadProblemList(); } };
        pagination.appendChild(prevBtn);

        const pageInfo = document.createElement('span');
        pageInfo.className = 'cf-page-info';
        pageInfo.textContent = `第 ${currentPage} / ${totalPages} 页（共 ${totalFiltered} 题）`;
        pagination.appendChild(pageInfo);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'cf-page-btn';
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
    const diffClass = problem.difficulty === '简单' ? 'cf-tag-easy' :
                     problem.difficulty === '困难' ? 'cf-tag-hard' : 'cf-tag-medium';
    document.getElementById('detailDifficulty').className = `cf-tag ${diffClass}`;
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
    resultSection.className = 'cf-result';
    document.getElementById('resultStatus').textContent = '正在评测...';
    document.getElementById('resultStatus').className = 'cf-result-header';
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
            const statusLower = status.toLowerCase();
            const resultHeader = document.getElementById('resultStatus');
            resultHeader.textContent = statusText[status] || status;
            resultHeader.className = `cf-result-header ${statusLower}`;
            resultSection.className = 'cf-result';

            // 渲染可视化测试点卡片
            const detailContainer = document.getElementById('resultDetail');
            detailContainer.innerHTML = '';

            if (result.testCases && result.testCases.length > 0) {
                const passed = result.passedCases || 0;
                const total = result.totalCases || 0;
                const scoreHtml = `<div class="cf-tc-summary">通过 ${passed}/${total} 个测试点</div>`;
                const cardsHtml = result.testCases.map(tc => {
                    const s = tc.status.toLowerCase();
                    const isAC = tc.status === 'AC';
                    const isCE = tc.status === 'CE';
                    const verdictClass = s === 'ac' ? 'ac' : s;
                    return `
                        <div class="cf-tc">
                            <div class="cf-tc-row">
                                <span class="cf-tc-name">#${tc.id}</span>
                                <span class="cf-tc-verdict ${verdictClass}">${tc.status}</span>
                                ${tc.timeMs > 0 ? `<span class="cf-tc-time">${tc.timeMs}ms</span>` : ''}
                            </div>
                            ${!isAC && !isCE && (tc.expected || tc.actual) ? `
                            <div class="cf-tc-row">
                                <span class="cf-tc-name" style="min-width:50px">期望</span>
                                <pre style="margin:0;font-family:var(--cf-code);font-size:12px;flex:1;background:var(--cf-bg);padding:6px 10px;border-radius:3px;">${escapeHtml(tc.expected)}</pre>
                            </div>
                            <div class="cf-tc-row">
                                <span class="cf-tc-name" style="min-width:50px">实际</span>
                                <pre style="margin:0;font-family:var(--cf-code);font-size:12px;flex:1;background:var(--cf-bg);padding:6px 10px;border-radius:3px;">${escapeHtml(tc.actual)}</pre>
                            </div>
                            ` : ''}
                            ${tc.detail && isCE ? `<div class="cf-tc-row"><pre style="margin:0;font-family:var(--cf-code);font-size:12px;flex:1;background:#1a1a2e;color:#e4e4e7;padding:10px;border-radius:3px;white-space:pre-wrap;">${escapeHtml(tc.detail)}</pre></div>` : ''}
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
            document.getElementById('resultStatus').className = 'cf-result-header';
            document.getElementById('resultDetail').textContent = result.message || '服务器错误';
            resultSection.className = 'cf-result';
        }
    } catch (error) {
        document.getElementById('resultStatus').textContent = '提交失败';
        document.getElementById('resultDetail').textContent = '无法连接到服务器，请确保评测服务器已启动';
        resultSection.className = 'cf-result';
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
            table.className = 'cf-table';
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
                row.className = isMe ? 'cf-row-self' : '';
                row.innerHTML = `
                    <td class="cf-rank">${entry.rank}</td>
                    <td class="cf-user-cell">${isMe ? '✦ ' : ''}${escapeHtml(entry.username)}</td>
                    <td class="cf-ac-count">${entry.acCount}</td>`;
                tbody.appendChild(row);
            });
            list.appendChild(table);
        } else {
            list.style.display = 'block';
            list.innerHTML = '<div class="cf-empty">暂无排行数据</div>';
        }
    } catch (error) {
        loading.style.display = 'none';
        list.style.display = 'block';
        list.innerHTML = '<div class="cf-empty">加载排行榜失败</div>';
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
                item.className = 'cf-history-item';
                const statusClass = 'cf-status-tag-' + entry.status.toLowerCase();
                const statusMap = { 'AC': '通过', 'WA': '答案错误', 'TLE': '超时', 'RE': '运行时错误', 'CE': '编译错误', 'PE': '格式错误' };
                const problem = problems.find(p => p.id === entry.problemId);
                const statusText = statusMap[entry.status] || entry.status;
                item.innerHTML = `
                    <div class="cf-history-info">
                        <span class="cf-history-title">#${entry.problemId} ${problem ? problem.title : '未知题目'}</span>
                        <span class="cf-history-lang">${entry.language}</span>
                        <span class="cf-history-time">${entry.submittedAt || ''}</span>
                    </div>
                    <div class="cf-history-meta">
                        <span class="cf-status-tag ${statusClass}">${statusText}</span>
                        <span class="cf-history-duration">${entry.timeMs}ms</span>
                    </div>`;
                list.appendChild(item);
            });
        } else {
            empty.style.display = 'block';
        }
    } catch (error) {
        loading.style.display = 'none';
        list.style.display = 'block';
        list.innerHTML = '<div class="cf-empty">加载提交历史失败</div>';
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

        document.querySelector('#statTotal .cf-stat-num').textContent = data.totalSubmissions || 0;
        document.querySelector('#statTotal').className = 'cf-stat-card';
        document.querySelector('.ac .cf-stat-num').textContent = data.accepted || 0;
        document.querySelector('.wa .cf-stat-num').textContent = data.failed || 0;
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
            statusContainer.innerHTML = '<div class="cf-chart-empty">暂无评测记录</div>';
        } else {
            // CSS 环形图
            const segments = distKeys.map(k => `${colorsMap[k] || '#888'} ${dist[k] / totalCount * 360}deg`).join(', ');
            const donutHtml = `
                <div class="cf-donut-wrap">
                    <div class="cf-donut" style="background: conic-gradient(${segments});">
                        <div class="cf-donut-hole">
                            <span class="cf-donut-total">${totalCount}</span>
                            <span class="cf-donut-label">总提交</span>
                        </div>
                    </div>
                    <div class="cf-donut-legend">
                        ${distKeys.map(k => `
                            <div class="cf-donut-item">
                                <span class="cf-donut-dot" style="background:${colorsMap[k] || '#888'}"></span>
                                <span class="cf-donut-text">${labelsMap[k] || k}</span>
                                <span class="cf-donut-count">${dist[k]}</span>
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
            trendContainer.innerHTML = '<div class="cf-chart-empty">暂无提交记录</div>';
        } else {
            const maxCount = Math.max(...daily.map(d => d.count), 1);
            const barChartHtml = `
                <div class="cf-bars">
                    ${daily.map(d => `
                        <div class="cf-bar-col">
                            <div class="cf-bar-wrap">
                                <div class="cf-bar" style="height:${(d.count / maxCount) * 100}%"></div>
                            </div>
                            <div class="cf-bar-label">${d.date ? d.date.substring(5) : ''}</div>
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
