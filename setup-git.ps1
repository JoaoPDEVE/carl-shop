# Script para iniciar Git + Push para GitHub
# Salve como: setup-git.ps1
# Execute: .\setup-git.ps1

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   CARLSHOP - Git & GitHub Setup       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Git
Write-Host "1️⃣  Verificando Git..." -ForegroundColor Yellow
$gitVersion = git --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Git instalado: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Git não instalado!" -ForegroundColor Red
    Write-Host "   Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Pressione Enter para continuar"
    exit
}

# 2. Navegar para pasta
Write-Host ""
Write-Host "2️⃣  Navegando para projeto..." -ForegroundColor Yellow
$projectPath = "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
Set-Location $projectPath
Write-Host "   ✅ Localização: $(Get-Location)" -ForegroundColor Green

# 3. Configurar Git (primeira vez)
Write-Host ""
Write-Host "3️⃣  Configurando identidade Git..." -ForegroundColor Yellow

$gitName = git config --global user.name
$gitEmail = git config --global user.email

if ([string]::IsNullOrEmpty($gitName)) {
    Write-Host "   ⚠️  Nome não configurado. Digite seu nome:" -ForegroundColor Yellow
    $name = Read-Host "   Nome"
    git config --global user.name "$name"
    Write-Host "   ✅ Nome salvo: $name" -ForegroundColor Green
} else {
    Write-Host "   ✅ Nome já configurado: $gitName" -ForegroundColor Green
}

if ([string]::IsNullOrEmpty($gitEmail)) {
    Write-Host "   ⚠️  Email não configurado. Digite seu email:" -ForegroundColor Yellow
    $email = Read-Host "   Email"
    git config --global user.email "$email"
    Write-Host "   ✅ Email salvo: $email" -ForegroundColor Green
} else {
    Write-Host "   ✅ Email já configurado: $gitEmail" -ForegroundColor Green
}

# 4. Inicializar Git (se necessário)
Write-Host ""
Write-Host "4️⃣  Inicializando repositório Git..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "   ℹ️  Repositório já inicializado" -ForegroundColor Cyan
} else {
    git init
    Write-Host "   ✅ Repositório inicializado" -ForegroundColor Green
}

# 5. Verificar remote
Write-Host ""
Write-Host "5️⃣  Verificando conexão com GitHub..." -ForegroundColor Yellow

$remoteUrl = git remote get-url origin 2>$null
if ([string]::IsNullOrEmpty($remoteUrl)) {
    Write-Host "   ⚠️  Remote origin não configurado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Para adicionar, execute:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/SEU_USUARIO/carlshop.git" -ForegroundColor Cyan
    Write-Host ""
    $remoteUrl = Read-Host "   Cole a URL do GitHub (ou deixe em branco para pular)"
    
    if ($remoteUrl) {
        git remote add origin $remoteUrl
        Write-Host "   ✅ Remote adicionado: $remoteUrl" -ForegroundColor Green
    }
} else {
    Write-Host "   ✅ Remote configurado: $remoteUrl" -ForegroundColor Green
}

# 6. Fazer commit
Write-Host ""
Write-Host "6️⃣  Preparando commit..." -ForegroundColor Yellow

Write-Host "   Adicionando arquivos..." -ForegroundColor Cyan
git add .
Write-Host "   ✅ Arquivos adicionados" -ForegroundColor Green

Write-Host "   Criando commit..." -ForegroundColor Cyan
git commit -m "Deploy v1.0 - CARLSHOP com Vercel+Railway" --allow-empty
Write-Host "   ✅ Commit criado" -ForegroundColor Green

# 7. Fazer push
Write-Host ""
Write-Host "7️⃣  Enviando para GitHub..." -ForegroundColor Yellow

if ([string]::IsNullOrEmpty($remoteUrl)) {
    Write-Host "   ❌ Remote origin não configurado. Não é possível fazer push." -ForegroundColor Red
} else {
    Write-Host "   ℹ️  Aguarde... (pode pedir autenticação)" -ForegroundColor Cyan
    git push -u origin main 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Push realizado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Erro ao fazer push. Verifique a URL do repositório." -ForegroundColor Yellow
    }
}

# 8. Resumo final
Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          ✅ SETUP COMPLETO!          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "📖 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Vercel: https://vercel.com/" -ForegroundColor Cyan
Write-Host "   2. Railway: https://railway.app/" -ForegroundColor Cyan
Write-Host "   3. Conectar seu repositório GitHub" -ForegroundColor Cyan
Write-Host ""

Write-Host "📚 Guia completo: DEPLOY_VERCEL_RAILWAY.md" -ForegroundColor Yellow
Write-Host ""

Read-Host "Pressione Enter para finalizar"
