param()

# 如果不是 git 仓库,跳过检查
$isGit = git rev-parse --is-inside-work-tree 2>$null
if (-not $isGit) { exit 0 }

# 检查是否有代码/配置/文档更改(排除 .claude/ 自身)
$changed = git diff --name-only HEAD 2>$null | Where-Object { $_ -and $_ -notmatch '^\.claude/' }
$untracked = git ls-files --others --exclude-standard 2>$null | Where-Object { $_ -and $_ -notmatch '^\.claude/' }

$hasChanges = ($changed -and @($changed).Count -gt 0) -or ($untracked -and @($untracked).Count -gt 0)
if (-not $hasChanges) { exit 0 }

# 验证标记: 存在 .claude/.verified 表示已验证
if (Test-Path ".claude/.verified" -PathType Leaf) {
    Remove-Item ".claude/.verified" -Force
    exit 0
}

# ---- 阻止 Claude 退出 ----
$msg = @"

STOP HOOK: 交付验收未通过

本轮修改了代码/配置/文档,但未说明验证结果。
请在结束前完成验证,并在对话中说明测试、lint、typecheck、
功能验证或 TODO 检查的结果。

验证通过后创建标记以解除阻止:
  PowerShell: New-Item -Type File .claude/.verified
  Bash:       touch .claude/.verified

"@

if ($changed) { $msg += "已修改: $($changed -join ', ')`n" }
if ($untracked) { $msg += "新文件: $($untracked -join ', ')`n" }

Write-Error $msg
exit 1
