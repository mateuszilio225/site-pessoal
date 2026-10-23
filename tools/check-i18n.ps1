# Verifica a paridade de chaves entre os dicionários pt e en de js/i18n.js.
# Uso: powershell -File tools/check-i18n.ps1

$ErrorActionPreference = "Stop"
$path = Join-Path $PSScriptRoot "..\js\i18n.js"
$raw = Get-Content $path -Raw

$ptStart = $raw.IndexOf("pt: {")
$enStart = $raw.IndexOf("en: {")
if ($ptStart -lt 0 -or $enStart -lt 0 -or $enStart -le $ptStart) {
  Write-Error "Nao foi possivel localizar os blocos pt/en em $path"
  exit 1
}

$ptBlock = $raw.Substring($ptStart, $enStart - $ptStart)
$enBlock = $raw.Substring($enStart)

$ptKeys = [regex]::Matches($ptBlock, '"([a-z0-9_.]+)"\s*:') | ForEach-Object { $_.Groups[1].Value }
$enKeys = [regex]::Matches($enBlock, '"([a-z0-9_.]+)"\s*:') | ForEach-Object { $_.Groups[1].Value }

$missing = @($ptKeys | Where-Object { $enKeys -notcontains $_ })
$extra = @($enKeys | Where-Object { $ptKeys -notcontains $_ })

if ($missing.Count -gt 0 -or $extra.Count -gt 0) {
  Write-Host "FALHOU" -ForegroundColor Red
  if ($missing.Count -gt 0) { Write-Host "  faltam em en: $($missing -join ', ')" }
  if ($extra.Count -gt 0) { Write-Host "  sobram em en:  $($extra -join ', ')" }
  exit 1
}

Write-Host "i18n OK: $($ptKeys.Count) chaves" -ForegroundColor Green
