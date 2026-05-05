#include <bits/stdc++.h>
#define int long long
using namespace std;
int mod=998244353;
void solve(){
    int n,x;
    cin>>n>>x;
    int ans0=0;
    int ans1=0;
    int cntall=0;
    int cnt=0;
    int cntl=0;
    int cntr=0;
    int n0=((n+1)/4)*4-1;
        cntall=n0/4+1;
        cnt=x/4+1;
        cntl=cnt-1;
        cntr=cntall-1-cntl;
    if(x<=n0){
        ans0=((cntl+1)*(cntr+1))%mod;
    }

    if(n>=n0+2)cntall++;
    cntl=x/4;
    cntr=cntall-cntl;
    if(x<=n0+2)ans1=((cntl)*(cntr))%mod;
    cout<<(ans1+ans0)%mod<<endl;
}


signed main (){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int T=1;
    cin>>T;
    while(T--){
        solve();
    }
    return 0;
}