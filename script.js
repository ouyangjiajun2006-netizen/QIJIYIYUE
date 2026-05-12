// ===== 题目数据 =====
const problems = [
    { id: 1, title: "A + B 问题", difficulty: "简单", description: "输入两个整数 a 和 b，输出它们的和。", sampleInput: "1 2", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 2, title: "判断奇偶数", difficulty: "简单", description: "输入一个整数，判断它是奇数还是偶数。如果是奇数，输出 odd；如果是偶数，输出 even。", sampleInput: "5", sampleOutput: "odd", timeLimit: 1000, memoryLimit: 256 },
    { id: 3, title: "求最大值", difficulty: "中等", description: "输入三个整数，输出其中的最大值。", sampleInput: "3 7 5", sampleOutput: "7", timeLimit: 1000, memoryLimit: 256 },
    { id: 4, title: "阶乘计算", difficulty: "简单", description: "输入一个正整数 n（1 ≤ n ≤ 12），输出 n 的阶乘。", sampleInput: "5", sampleOutput: "120", timeLimit: 1000, memoryLimit: 256 },
    { id: 5, title: "斐波那契数列", difficulty: "中等", description: "输入一个正整数 n（1 ≤ n ≤ 30），输出斐波那契数列的第 n 项。", sampleInput: "6", sampleOutput: "8", timeLimit: 1000, memoryLimit: 256 },
    { id: 6, title: "素数判断", difficulty: "中等", description: "输入一个正整数 n（2 ≤ n ≤ 10^6），判断它是否为素数。", sampleInput: "17", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 7, title: "数字反转", difficulty: "简单", description: "输入一个整数 n（-10^9 ≤ n ≤ 10^9），输出它的反转数。", sampleInput: "-1230", sampleOutput: "-321", timeLimit: 1000, memoryLimit: 256 },
    { id: 8, title: "回文数判断", difficulty: "简单", description: "输入一个正整数 n（1 ≤ n ≤ 10^9），判断它是否为回文数。", sampleInput: "12321", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 9, title: "最大公约数", difficulty: "中等", description: "输入两个正整数 a 和 b（1 ≤ a, b ≤ 10^9），输出它们的最大公约数。", sampleInput: "12 18", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 10, title: "最小公倍数", difficulty: "中等", description: "输入两个正整数 a 和 b（1 ≤ a, b ≤ 10^6），输出它们的最小公倍数。", sampleInput: "12 18", sampleOutput: "36", timeLimit: 1000, memoryLimit: 256 },
    { id: 11, title: "冒泡排序", difficulty: "中等", description: "输入 n 个整数，使用冒泡排序将它们按从小到大排序后输出。", sampleInput: "5\n3 1 4 1 5", sampleOutput: "1 1 3 4 5", timeLimit: 1000, memoryLimit: 256 },
    { id: 12, title: "字符串统计", difficulty: "简单", description: "输入一个字符串，统计其中大写字母、小写字母、数字和其他字符的个数。", sampleInput: "Hello123!", sampleOutput: "1 4 3 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 13, title: "约瑟夫问题", difficulty: "困难", description: "有 n 个人围成一圈，数到 m 的人出列，输出出列顺序。", sampleInput: "5 3", sampleOutput: "3 1 5 2 4", timeLimit: 1000, memoryLimit: 256 },
    { id: 14, title: "水仙花数", difficulty: "简单", description: "输入一个三位数，判断它是否为水仙花数。", sampleInput: "153", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 15, title: "完全平方数", difficulty: "简单", description: "输入一个正整数 n，判断它是否为完全平方数。", sampleInput: "16", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 16, title: "进制转换", difficulty: "中等", description: "输入一个十进制整数 n 和目标进制 k，输出 n 的 k 进制表示。", sampleInput: "255 16", sampleOutput: "FF", timeLimit: 1000, memoryLimit: 256 },
    { id: 17, title: "杨辉三角", difficulty: "中等", description: "输入一个正整数 n，输出杨辉三角的前 n 行。", sampleInput: "5", sampleOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 18, title: "字符串反转", difficulty: "简单", description: "输入一个字符串，输出它的反转字符串。", sampleInput: "hello", sampleOutput: "olleh", timeLimit: 1000, memoryLimit: 256 },
    { id: 19, title: "统计单词数", difficulty: "中等", description: "输入一行字符串，统计其中单词的个数。", sampleInput: "Hello world from OJ", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 20, title: "二分查找", difficulty: "中等", description: "给定一个升序排列的数组和一个目标值，判断目标值是否在数组中。", sampleInput: "5 3\n1 2 3 4 5", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 21, title: "快速排序", difficulty: "中等", description: "输入 n 个整数，使用快速排序将它们按从小到大排序后输出。", sampleInput: "6\n5 2 8 1 9 3", sampleOutput: "1 2 3 5 8 9", timeLimit: 1000, memoryLimit: 256 },
    { id: 22, title: "汉诺塔", difficulty: "困难", description: "汉诺塔问题：输出移动步骤。", sampleInput: "3", sampleOutput: "A->C\nA->B\nC->B\nA->C\nB->A\nB->C\nA->C", timeLimit: 1000, memoryLimit: 256 },
    { id: 23, title: "最长公共子序列", difficulty: "困难", description: "给定两个字符串，找出它们的最长公共子序列的长度。", sampleInput: "abcde\nace", sampleOutput: "3", timeLimit: 1000, memoryLimit: 256 },
    { id: 24, title: "0-1背包问题", difficulty: "困难", description: "给定 n 个物品和容量为 C 的背包，求能装入的最大总价值。", sampleInput: "4 7\n2 3\n3 4\n4 5\n5 6", sampleOutput: "10", timeLimit: 1000, memoryLimit: 256 },
    { id: 25, title: "全排列", difficulty: "中等", description: "输入一个正整数 n，输出 1 到 n 的所有全排列。", sampleInput: "3", sampleOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1", timeLimit: 1000, memoryLimit: 256 },
    { id: 26, title: "八皇后问题", difficulty: "困难", description: "在 8×8 的棋盘上放置八个皇后，输出所有解的数量。", sampleInput: "8", sampleOutput: "92", timeLimit: 1000, memoryLimit: 256 },
    { id: 27, title: "最短路径（Dijkstra）", difficulty: "困难", description: "求从节点 1 到节点 n 的最短路径长度。", sampleInput: "4 5\n1 2 2\n1 3 3\n2 3 1\n2 4 5\n3 4 1", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 28, title: "最小生成树（Kruskal）", difficulty: "困难", description: "求该图的最小生成树的权值之和。", sampleInput: "4 5\n1 2 1\n1 3 4\n2 3 2\n2 4 3\n3 4 5", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 29, title: "高精度加法", difficulty: "中等", description: "输入两个正整数（长度不超过 1000 位），输出它们的和。", sampleInput: "12345678901234567890\n98765432109876543210", sampleOutput: "111111111011111111100", timeLimit: 1000, memoryLimit: 256 },
    { id: 30, title: "高精度乘法", difficulty: "中等", description: "输入两个正整数（长度不超过 500 位），输出它们的乘积。", sampleInput: "123456789\n987654321", sampleOutput: "121932631112635269", timeLimit: 1000, memoryLimit: 256 },
    { id: 31, title: "括号匹配", difficulty: "中等", description: "判断括号是否匹配。", sampleInput: "({[]})", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 32, title: "最长公共前缀", difficulty: "中等", description: "输入 n 个字符串，找出它们的最长公共前缀。", sampleInput: "3\nflower\nflow\nflight", sampleOutput: "fl", timeLimit: 1000, memoryLimit: 256 },
    { id: 33, title: "合并有序数组", difficulty: "中等", description: "给定两个升序排列的数组，将它们合并为一个升序数组。", sampleInput: "3 4\n1 3 5\n2 4 6 8", sampleOutput: "1 2 3 4 5 6 7 8", timeLimit: 1000, memoryLimit: 256 },
    { id: 34, title: "约瑟夫环", difficulty: "中等", description: "n 个人围成一圈，每报到 m 的人出列，求最后剩下的人的编号。", sampleInput: "7 3", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 35, title: "矩阵乘法", difficulty: "中等", description: "给定两个矩阵 A 和 B，计算它们的乘积 C = A * B。", sampleInput: "2 3 2\n1 2 3\n4 5 6\n1 2\n3 4\n5 6", sampleOutput: "22 28\n49 64", timeLimit: 1000, memoryLimit: 256 },
    { id: 36, title: "最长递增子序列", difficulty: "困难", description: "找出数组中最长的严格递增子序列的长度。", sampleInput: "8\n10 9 2 5 3 7 101 18", sampleOutput: "4", timeLimit: 1000, memoryLimit: 256 },
    { id: 37, title: "最大子段和", difficulty: "中等", description: "找出一个连续子数组，使得该子数组的和最大。", sampleInput: "9\n-2 1 -3 4 -1 2 1 -5 4", sampleOutput: "6", timeLimit: 1000, memoryLimit: 256 },
    { id: 38, title: "合并两个有序数组", difficulty: "简单", description: "给定两个升序排列的整数数组，将它们合并为一个升序数组并输出。", sampleInput: "3 4\n1 3 5\n2 4 6 8", sampleOutput: "1 2 3 4 5 6 7 8", timeLimit: 1000, memoryLimit: 256 },
    { id: 39, title: "回文数判断", difficulty: "简单", description: "给定一个整数，判断它是否是回文数。", sampleInput: "121", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 },
    { id: 40, title: "斐波那契数列", difficulty: "简单", description: "给定 n，输出 F(n) 的值。", sampleInput: "6", sampleOutput: "8", timeLimit: 1000, memoryLimit: 256 },
    { id: 41, title: "素数判断", difficulty: "简单", description: "给定一个正整数，判断它是否为素数。", sampleInput: "17", sampleOutput: "yes", timeLimit: 1000, memoryLimit: 256 }
];

let currentProblemId = null;
let isSubmitting = false;
const PAGE_SIZE = 10;
let currentPage = 1;
let currentUser = null;

try {
    const savedUser = localStorage.getItem('myoj_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
} catch (e) {
    localStorage.removeItem('myoj_user');
}

document.addEventListener('DOMContentLoaded', function() {
    loadProblemList();
    updateUserBar();
    if (currentUser) {
        loadFailedProblems();
        loadPassedProblems();
    }
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
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
    if (currentUser) {
        userInfo.style.display = 'flex';
        userActions.style.display = 'none';
        userNameDisplay.textContent = currentUser.username;
    } else {
        userInfo.style.display = 'none';
        userActions.style.display = 'flex';
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

// ===== 题目列表（分页） =====
function loadProblemList() {
    const list = document.getElementById('problemList');
    list.innerHTML = '';
    const totalPages = Math.ceil(problems.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, problems.length);
    const pageProblems = problems.slice(start, end);

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
        pageInfo.textContent = `第 ${currentPage} / ${totalPages} 页`;
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
    document.getElementById('codeEditor').value = '';
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

    const code = document.getElementById('codeEditor').value.trim();
    if (!code) {
        alert('请先编写代码');
        return;
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

            let detail = '';
            if (result.details) {
                detail = result.details;
            }
            if (result.passedCases !== undefined && result.totalCases !== undefined) {
                detail += `\n通过测试点: ${result.passedCases}/${result.totalCases}`;
            }
            document.getElementById('resultDetail').textContent = detail;

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
