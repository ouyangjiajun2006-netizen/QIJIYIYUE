#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

/*
 * 线段树模板 (Segment Tree Template)
 * 功能：支持区间求和、区间最大值、区间最小值
 * 操作：建树、单点更新、区间查询
 *
 * 使用示例：
 *   vector<int> arr = {1, 3, 5, 7, 9, 11};
 *   SegmentTree st(arr);
 *   st.build(1, 0, n - 1);
 *   int sum = st.querySum(1, 0, n - 1, l, r);
 *   st.update(1, 0, n - 1, idx, val);
 */

class SegmentTree {
private:
    int n;                     // 数组大小
    vector<int> arr;           // 原始数组
    vector<int> sumTree;       // 区间和线段树
    vector<int> maxTree;       // 区间最大值线段树
    vector<int> minTree;       // 区间最小值线段树

    // 建树：构建线段树
    void build(int node, int start, int end) {
        if (start == end) {
            sumTree[node] = arr[start];
            maxTree[node] = arr[start];
            minTree[node] = arr[start];
            return;
        }
        int mid = (start + end) >> 1;
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        build(leftChild, start, mid);
        build(rightChild, mid + 1, end);
        pushUp(node);
    }

    // 上推：用子节点更新父节点
    void pushUp(int node) {
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        sumTree[node] = sumTree[leftChild] + sumTree[rightChild];
        maxTree[node] = max(maxTree[leftChild], maxTree[rightChild]);
        minTree[node] = min(minTree[leftChild], minTree[rightChild]);
    }

    // 单点更新：将位置 idx 的值更新为 val
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            arr[idx] = val;
            sumTree[node] = val;
            maxTree[node] = val;
            minTree[node] = val;
            return;
        }
        int mid = (start + end) >> 1;
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        if (idx <= mid) {
            update(leftChild, start, mid, idx, val);
        } else {
            update(rightChild, mid + 1, end, idx, val);
        }
        pushUp(node);
    }

    // 区间查询：查询 [l, r] 的区间和
    int querySum(int node, int start, int end, int l, int r) {
        if (l <= start && end <= r) {
            return sumTree[node];
        }
        int mid = (start + end) >> 1;
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        int res = 0;
        if (l <= mid) {
            res += querySum(leftChild, start, mid, l, r);
        }
        if (r > mid) {
            res += querySum(rightChild, mid + 1, end, l, r);
        }
        return res;
    }

    // 区间查询：查询 [l, r] 的最大值
    int queryMax(int node, int start, int end, int l, int r) {
        if (l <= start && end <= r) {
            return maxTree[node];
        }
        int mid = (start + end) >> 1;
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        int res = -2e9;  // 负无穷
        if (l <= mid) {
            res = max(res, queryMax(leftChild, start, mid, l, r));
        }
        if (r > mid) {
            res = max(res, queryMax(rightChild, mid + 1, end, l, r));
        }
        return res;
    }

    // 区间查询：查询 [l, r] 的最小值
    int queryMin(int node, int start, int end, int l, int r) {
        if (l <= start && end <= r) {
            return minTree[node];
        }
        int mid = (start + end) >> 1;
        int leftChild = node << 1;
        int rightChild = node << 1 | 1;
        int res = 2e9;   // 正无穷
        if (l <= mid) {
            res = min(res, queryMin(leftChild, start, mid, l, r));
        }
        if (r > mid) {
            res = min(res, queryMin(rightChild, mid + 1, end, l, r));
        }
        return res;
    }

public:
    // 构造函数：传入原始数组
    SegmentTree(const vector<int>& input) {
        arr = input;
        n = arr.size();
        sumTree.resize(4 * n);
        maxTree.resize(4 * n);
        minTree.resize(4 * n);
    }

    // 对外接口：建树
    void build() {
        if (n > 0) {
            build(1, 0, n - 1);
        }
    }

    // 对外接口：单点更新
    void update(int idx, int val) {
        if (idx >= 0 && idx < n) {
            update(1, 0, n - 1, idx, val);
        }
    }

    // 对外接口：区间求和
    int querySum(int l, int r) {
        if (l > r || l < 0 || r >= n) return 0;
        return querySum(1, 0, n - 1, l, r);
    }

    // 对外接口：区间最大值
    int queryMax(int l, int r) {
        if (l > r || l < 0 || r >= n) return -2e9;
        return queryMax(1, 0, n - 1, l, r);
    }

    // 对外接口：区间最小值
    int queryMin(int l, int r) {
        if (l > r || l < 0 || r >= n) return 2e9;
        return queryMin(1, 0, n - 1, l, r);
    }

    // 获取原始数组
    const vector<int>& getArray() const {
        return arr;
    }
};

// ========== 测试代码 ==========
int main() {
    // 测试数据
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    int n = arr.size();

    cout << "原始数组: ";
    for (int x : arr) cout << x << " ";
    cout << endl << endl;

    // 创建线段树并建树
    SegmentTree st(arr);
    st.build();

    // 测试区间查询
    cout << "=== 区间查询测试 ===" << endl;
    cout << "区间 [1, 4] 的和: " << st.querySum(1, 4) << endl;       // 3+5+7+9 = 24
    cout << "区间 [1, 4] 的最大值: " << st.queryMax(1, 4) << endl;   // 9
    cout << "区间 [1, 4] 的最小值: " << st.queryMin(1, 4) << endl;   // 3
    cout << "区间 [0, 5] 的和: " << st.querySum(0, 5) << endl;       // 1+3+5+7+9+11 = 36
    cout << endl;

    // 测试单点更新
    cout << "=== 单点更新测试 ===" << endl;
    cout << "将位置 2 的值从 5 更新为 10" << endl;
    st.update(2, 10);
    cout << "更新后数组: ";
    for (int x : st.getArray()) cout << x << " ";
    cout << endl;
    cout << "区间 [1, 4] 的和: " << st.querySum(1, 4) << endl;       // 3+10+7+9 = 29
    cout << "区间 [1, 4] 的最大值: " << st.queryMax(1, 4) << endl;   // 10
    cout << "区间 [1, 4] 的最小值: " << st.queryMin(1, 4) << endl;   // 3
    cout << endl;

    // 测试边界情况
    cout << "=== 边界测试 ===" << endl;
    cout << "单点查询 [2, 2] 的值: " << st.querySum(2, 2) << endl;   // 10
    cout << "全区间 [0, 5] 的和: " << st.querySum(0, 5) << endl;     // 1+3+10+7+9+11 = 41
    cout << "全区间 [0, 5] 的最大值: " << st.queryMax(0, 5) << endl; // 11
    cout << "全区间 [0, 5] 的最小值: " << st.queryMin(0, 5) << endl; // 1

    return 0;
}