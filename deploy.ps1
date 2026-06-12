# Redeploy to GitHub Pages: pnpm build, then publish dist/ to the gh-pages branch.
# Usage: ./deploy.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
pnpm build
Set-Location dist
git init -b gh-pages | Out-Null
git add -A
git commit -m "deploy $(Get-Date -Format yyyy-MM-dd_HH:mm)" | Out-Null
git push -f https://github.com/L0x3n/sail-coop.git gh-pages
Set-Location ..
Remove-Item -Recurse -Force dist\.git
Write-Host "Deployed -> https://l0x3n.github.io/sail-coop/ (live in ~1 min)"
