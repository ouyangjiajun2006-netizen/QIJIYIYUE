// ===== 题目数据 =====
const problems = [
    {
        id: 1,
        title: "A + B 问题",
        difficulty: "简单",
        description: "输入两个整数 a 和 b，输出它们的和。",
        sampleInput: "1 2",
        sampleOutput: "3",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 2,
        title: "判断奇偶数",
        difficulty: "简单",
        description: "输入一个整数，判断它是奇数还是偶数。如果是奇数，输出 odd；如果是偶数，输出 even。",
        sampleInput: "5",
        sampleOutput: "odd",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 3,
        title: "求最大值",
        difficulty: "中等",
        description: "输入三个整数，输出其中的最大值。",
        sampleInput: "3 7 5",
        sampleOutput: "7",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 4,
        title: "阶乘计算",
        difficulty: "简单",
        description: "输入一个正整数 n（1 ≤ n ≤ 12），输出 n 的阶乘。",
        sampleInput: "5",
        sampleOutput: "120",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 5,
        title: "斐波那契数列",
        difficulty: "中等",
        description: "输入一个正整数 n（1 ≤ n ≤ 30），输出斐波那契数列的第 n 项。斐波那契数列定义：F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)。",
        sampleInput: "6",
        sampleOutput: "8",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 6,
        title: "素数判断",
        difficulty: "中等",
        description: "输入一个正整数 n（2 ≤ n ≤ 10^6），判断它是否为素数。如果是素数输出 yes，否则输出 no。",
        sampleInput: "17",
        sampleOutput: "yes",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 7,
        title: "数字反转",
        difficulty: "简单",
        description: "输入一个整数 n（-10^9 ≤ n ≤ 10^9），输出它的反转数。注意：反转后要去掉前导零。例如：-1230 反转后为 -321。",
        sampleInput: "-1230",
        sampleOutput: "-321",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 8,
        title: "回文数判断",
        difficulty: "简单",
        description: "输入一个正整数 n（1 ≤ n ≤ 10^9），判断它是否为回文数（正着读和倒着读一样）。如果是输出 yes，否则输出 no。",
        sampleInput: "12321",
        sampleOutput: "yes",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 9,
        title: "最大公约数",
        difficulty: "中等",
        description: "输入两个正整数 a 和 b（1 ≤ a, b ≤ 10^9），输出它们的最大公约数（GCD）。",
        sampleInput: "12 18",
        sampleOutput: "6",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 10,
        title: "最小公倍数",
        difficulty: "中等",
        description: "输入两个正整数 a 和 b（1 ≤ a, b ≤ 10^6），输出它们的最小公倍数（LCM）。",
        sampleInput: "12 18",
        sampleOutput: "36",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 11,
        title: "冒泡排序",
        difficulty: "中等",
        description: "输入一个正整数 n（1 ≤ n ≤ 100），然后输入 n 个整数，使用冒泡排序将它们按从小到大排序后输出。",
        sampleInput: "5\n3 1 4 1 5",
        sampleOutput: "1 1 3 4 5",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 12,
        title: "字符串统计",
        difficulty: "简单",
        description: "输入一个字符串（长度不超过 1000），统计其中大写字母、小写字母、数字和其他字符的个数，按顺序输出。",
        sampleInput: "Hello123!",
        sampleOutput: "1 4 3 1",
        timeLimit: 1000,
        memoryLimit: 256
    },
    {
        id: 13,
        title: "约瑟夫问题",
        difficulty: "困难",
        description: "有 n 个人围成一圈，从第一个人开始报数，数到 m 的人出列，然后从下一个人重新开始报数。输入 n 和 m（1 ≤ n, m ≤ 100），输出出列顺序。",
        sampleInput: "5 3",
        sampleOutput: "3 1 5 2 4",
        timeLimit: 1000,
        memoryLimit: 256
    }
];

let currentProblemId = null;
let isSubmitting = false;

document.addEventListener('DOMContentLoaded', function() {
    loadProblemList();
});

function loadProblemList() {
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';

    problems.forEach(problem => {
        const item = document.createElement('div');
        item.className = 'problem-item';
        item.onclick = () => selectProblem(problem.id);
        
        const diffClass = problem.difficulty === '简单' ? 'difficulty-easy' : 'difficulty-medium';
        
        item.innerHTML = `
            <span class="problem-id">#${problem.id}</span>
            <span class="problem-name">${problem.title}</span>
            <span class="problem-difficulty ${diffClass}">${problem.difficulty}</span>
        `;
        
        problemList.appendChild(item);
    });
}

function selectProblem(problemId) {
    currentProblemId = problemId;
    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    document.getElementById('detailSection').style.display = 'block';
    document.getElementById('problemTitle').textContent = `#${problem.id} ${problem.title}`;
    
    const diffEl = document.getElementById('problemDifficulty');
    diffEl.textContent = problem.difficulty;
    diffEl.className = `difficulty ${problem.difficulty === '简单' ? 'difficulty-easy' : 'difficulty-medium'}`;
    
    document.getElementById('problemDescription').textContent = problem.description;
    document.getElementById('sampleInput').textContent = problem.sampleInput;
    document.getElementById('sampleOutput').textContent = problem.sampleOutput;
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('codeEditor').value = '';
    
    document.getElementById('detailSection').scrollIntoView({ behavior: 'smooth' });
}

async function submitCode() {
    if (isSubmitting) return;
    
    const code = document.getElementById('codeEditor').value.trim();
    if (!code) {
        alert('请先编写代码！');
        return;
    }

    if (!currentProblemId) {
        alert('请先选择一道题目！');
        return;
    }

    const language = document.getElementById('languageSelect').value;
    
    isSubmitting = true;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> 评测中...';
    
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'block';
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = '<div class="loading" style="margin: 20px auto;"></div><p style="text-align: center; color: #666;">正在评测中，请稍候...</p>';

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                problemId: currentProblemId,
                language: language,
                code: code
            })
        });

        const result = await response.json();
        displayResult(result);
        
    } catch (error) {
        document.getElementById('resultContent').innerHTML = `
            <div class="result-item" style="background: #f8d7da; color: #721c24;">
                ❌ 提交失败：无法连接到评测服务器（请确保服务器已启动）
            </div>
        `;
    } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '🚀 提交评测';
    }
}

function displayResult(result) {
    const resultContent = document.getElementById('resultContent');
    let html = '';
    let passedCount = 0;
    let totalCount = result.results.length;

    result.results.forEach((testResult, index) => {
        const statusMap = {
            'AC': '✅ 通过',
            'WA': '❌ 答案错误',
            'TLE': '⏰ 超时',
            'RE': '💥 运行时错误',
            'CE': '🔧 编译错误',
            'PE': '📐 格式错误'
        };
        
        const classMap = {
            'AC': 'status-AC', 'WA': 'status-WA', 'TLE': 'status-TLE',
            'RE': 'status-RE', 'CE': 'status-CE', 'PE': 'status-PE'
        };
        
        const bgMap = {
            'AC': '#d4edda', 'WA': '#f8d7da', 'TLE': '#fff3cd',
            'RE': '#f8d7da', 'CE': '#fff3cd', 'PE': '#fff3cd'
        };

        if (testResult.status === 'AC') passedCount++;

        html += `
            <div class="result-item" style="background: ${bgMap[testResult.status] || '#f8f9fa'};">
                <span class="test-case">测试点 #${index + 1}</span>
                <span class="status ${classMap[testResult.status] || ''}">${statusMap[testResult.status] || testResult.status}</span>
                <span style="color: #666; font-size: 0.9em;">
                    ${testResult.time !== undefined ? '耗时: ' + testResult.time + 'ms' : ''}
                </span>
            </div>
        `;

        if (testResult.detail) {
            html += `
                <div style="margin: 5px 0 15px 20px; padding: 10px; background: #2d2d2d; color: #f8f8f2; border-radius: 4px; font-size: 0.85em; white-space: pre-wrap;">
                    ${escapeHtml(testResult.detail)}
                </div>
            `;
        }
    });

    const allPassed = passedCount === totalCount;
    html += `
        <div class="result-summary ${allPassed ? 'passed' : 'failed'}">
            ${allPassed ? '✅ 恭喜通过！' : '❌ 未通过'}
            （${passedCount}/${totalCount} 个测试点通过）
        </div>
    `;

    resultContent.innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}