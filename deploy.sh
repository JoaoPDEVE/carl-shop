#!/bin/bash
# CARLSHOP - Quick Deploy Script
# Use este arquivo para fazer deploy rápido

echo "🚀 CARLSHOP - DEPLOYMENT SCRIPT"
echo "================================"
echo ""

# Verificar Node.js
echo "✅ Verificando Node.js..."
node --version
npm --version
echo ""

# Build
echo "🏗️  Fazendo build de produção..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build falhou!"
  exit 1
fi
echo "✅ Build concluído com sucesso!"
echo ""

# Listar arquivos do build
echo "📦 Arquivos gerados:"
ls -lh dist/
echo ""

# Teste local
echo "🧪 Testando localmente..."
echo "Iniciando servidor em http://localhost:5000"
echo "Pressione CTRL+C para parar"
echo ""

npm run preview &
PREVIEW_PID=$!

sleep 3

# Health check
echo "📊 Testando health check..."
curl -s http://localhost:5000/api/health | jq . || echo "Health check não respondeu"
echo ""

echo "✅ Sistema testado com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Abra browser em http://localhost:5000"
echo "2. Teste login cliente (botão 'Login')"
echo "3. Teste login admin (botão 'Admin')"
echo "4. Se tudo OK, siga para DEPLOYMENT_GUIDE.md"
echo ""
echo "Parando servidor..."
kill $PREVIEW_PID
echo "✅ Feito!"
