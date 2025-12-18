@echo off
REM Script para fazer commit e push para GitHub

echo.
echo ========================================
echo   CARLSHOP - Deploy to GitHub
echo ========================================
echo.

cd /d "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"

REM Verificar se git está inicializado
if not exist .git (
    echo ❌ Git não inicializado. Executando: git init
    git init
)

REM Adicionar arquivos
echo ✓ Adicionando arquivos...
git add .

REM Criar commit
echo ✓ Criando commit...
git commit -m "Deploy v1.0 - CARLSHOP with Vercel+Railway setup"

REM Verificar se remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  Remote origin não configurado!
    echo.
    echo Execute PRIMEIRO:
    echo   git remote add origin https://github.com/SEU_USUARIO/carlshop.git
    echo.
    echo Depois rode este script novamente.
    pause
    exit /b 1
)

REM Push para GitHub
echo ✓ Enviando para GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Sucesso! Código no GitHub
    echo.
    echo Próximos passos:
    echo   1. Vercel: https://vercel.com/
    echo   2. Railway: https://railway.app/
    echo.
) else (
    echo ❌ Erro ao fazer push
)

pause
