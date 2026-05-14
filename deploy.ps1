# Creative Elephant — Deploy Script
# Bu scripti C:\Users\Lenovo\Desktop\atlas\hiveatlas klasöründe çalıştırın

Write-Host "🐘 Creative Elephant Deploy Başlıyor..." -ForegroundColor Cyan

# 1. Build kontrolü
Write-Host "`n📦 Build alınıyor..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build başarısız! Hatayı düzeltin." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build başarılı!" -ForegroundColor Green

# 2. Vercel CLI kurulu mu kontrol et
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "`n📥 Vercel CLI kuruluyor..." -ForegroundColor Yellow
    npm install -g vercel
}

# 3. Deploy
Write-Host "`n🚀 Vercel'e deploy ediliyor..." -ForegroundColor Cyan
Write-Host "⚡ Vercel login gerekirse tarayıcı açılacak - email ile giriş yapın." -ForegroundColor Yellow
vercel --prod
