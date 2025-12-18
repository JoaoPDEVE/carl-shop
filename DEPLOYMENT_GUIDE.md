# 🚀 GUIA COMPLETO DE DEPLOYMENT - CARLSHOP

## 📋 PRÉ-REQUISITOS

- Node.js v16+ instalado
- npm ou yarn
- Conta em serviço de hospedagem (Vercel, Render, Railway, Heroku, etc)
- Domínio (opcional para produção)
- Chaves API dos serviços (Firebase, Resend, MercadoPago)

---

## 🌍 OPÇÕES DE DEPLOYMENT

### **Opção 1: VERCEL** (Recomendado - Mais Fácil)

#### Passo 1: Preparar projeto
```bash
# Adicionar Next.js (opcional, não necessário agora)
# Ou simplesmente fazer deploy do SPA com Vite
```

#### Passo 2: Conectar ao GitHub
1. Faça push do seu projeto para GitHub
2. Acesse https://vercel.com
3. Clique em "New Project"
4. Selecione seu repositório
5. Escolha "Other" (para Vite)
6. Configure:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### Passo 3: Variáveis de Ambiente
No painel do Vercel, vá para **Settings > Environment Variables** e adicione:
```
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_RESEND_API_KEY=xxxxx
```

#### Passo 4: Deploy
Clique em "Deploy" e aguarde!

---

### **Opção 2: RENDER** (Gratuito + Pago)

#### Passo 1: Criar novo Web Service
1. Acesse https://render.com
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório GitHub

#### Passo 2: Configurar
- **Build Command:** `npm run build`
- **Start Command:** `npm run preview` (para servir dist) ou `node server.js` (backend)
- **Environment:** Node
- **Region:** São Paulo (Brazil)

#### Passo 3: Environment Variables
Adicione as mesmas variáveis do .env.example:
```
VITE_FIREBASE_API_KEY=xxxxx
VITE_RESEND_API_KEY=xxxxx
NODE_ENV=production
```

#### Passo 4: Deploy
Clique em "Create Web Service"

---

### **Opção 3: RAILWAY** (Muito Fácil)

#### Passo 1: Conectar GitHub
1. Acesse https://railway.app
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Autorize e selecione seu repositório

#### Passo 2: Configurar
Railway detecta automaticamente o Node.js

#### Passo 3: Environment Variables
Adicione suas variáveis de ambiente

#### Passo 4: Deploy
Railway faz deploy automaticamente!

---

### **Opção 4: HEROKU** (Pago)

#### Passo 1: Instalar Heroku CLI
```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku
```

#### Passo 2: Login
```bash
heroku login
```

#### Passo 3: Criar app
```bash
heroku create seu-app-name
```

#### Passo 4: Adicionar variáveis
```bash
heroku config:set VITE_FIREBASE_API_KEY=xxxxx
heroku config:set VITE_RESEND_API_KEY=xxxxx
heroku config:set NODE_ENV=production
```

#### Passo 5: Deploy
```bash
git push heroku main
```

---

## 🔧 PREPARAÇÃO DO PROJETO

### Passo 1: Build Local
```bash
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
npm run build
```

Verifica se está tudo OK:
```
✓ 1285 modules transformed.
dist/index.html                   0.43 kB
dist/assets/index-765ca998.css   42.60 kB
dist/assets/index-adca788a.js   569.98 kB
✓ built in 3.76s
```

### Passo 2: Criar .env.local
Copie `.env.example` para `.env.local` e preencha com suas chaves:

```bash
# Exemplo para desenvolvimento
cp .env.example .env.local
```

Edite `.env.local`:
```
NODE_ENV=production
VITE_FIREBASE_API_KEY=sua_chave_aqui
VITE_RESEND_API_KEY=sua_chave_aqui
FRONTEND_URL=https://seu-dominio.com.br
```

### Passo 3: Teste em Produção Localmente
```bash
# Instalar dependências
npm install

# Build
npm run build

# Preview do build
npm run preview
```

Acesse http://localhost:4173

---

## 🔐 CONFIGURAÇÃO DE SEGURANÇA

### 1. **Alterar Credenciais de Admin**

IMPORTANTE: Em produção, altere as credenciais padrão!

**Arquivo:** `src/components/Auth.jsx` (linha 27-28)

```jsx
const ADMIN_EMAIL = 'seu_email_admin_real@gmail.com'
const ADMIN_PASSWORD = 'sua_senha_super_secreta_aqui'
```

### 2. **Usar Variáveis de Ambiente**

Idealmente, recupere do .env:

```jsx
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
```

### 3. **Ativar HTTPS**

- ✅ Vercel: Automático
- ✅ Render: Automático
- ✅ Railway: Automático
- Heroku: Automático com domínio custom

### 4. **Headers de Segurança**

No seu `vite.config.js`, adicione:

```javascript
server: {
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  }
}
```

---

## 🗄️ BANCO DE DADOS

### Atualmente:
- ✅ localStorage (cliente) - Funciona para múltiplos clientes
- ✅ Admin-products (admin) - localStorage
- ✅ Firebase (opcional) - Para produção

### Para Produção com Múltiplos Clientes:

**Opção A: Firebase Realtime Database**
- Melhor para escalabilidade
- Gratuito até certo ponto
- Setup: https://console.firebase.google.com

**Opção B: MongoDB + Node.js**
- Mais controle
- Precisa de servidor próprio
- MongoDB Atlas oferece tier gratuito

**Opção C: PostgreSQL + Supabase**
- Excelente para relacional
- Gratuito até 500MB
- https://supabase.com

---

## 📊 MONITORAMENTO

### Logs em Produção

```bash
# Vercel - Dashboard automático
# Render - Dashboard automático
# Railway - Dashboard automático
# Heroku
heroku logs --tail
```

### Health Check

A API oferece um endpoint de health check:

```bash
curl https://seu-dominio.com/api/health
```

Resposta esperada:
```json
{
  "status": "✅ OK",
  "timestamp": "2025-12-18T10:30:45.123Z",
  "uptime": 12345.67,
  "environment": "production"
}
```

---

## 🚨 TROUBLESHOOTING

### Problema: Build falha
```
❌ Solução: 
1. Verifique se todas as dependências estão instaladas: npm install
2. Limpe cache: rm -rf node_modules && npm install
3. Verifique erros: npm run build 2>&1
```

### Problema: Variáveis de ambiente não funcionam
```
❌ Solução:
1. Confirme que prefix é VITE_
2. Reinicie o servidor após adicionar variáveis
3. Use import.meta.env.VITE_CHAVE (não process.env)
```

### Problema: CORS error em produção
```
❌ Solução:
1. Adicione FRONTEND_URL no .env
2. Atualize corsOptions em server.js
3. Reinicie o servidor backend
```

### Problema: Email não funciona
```
❌ Solução:
1. Verifique chave Resend API
2. Confirme que domínio está verificado no Resend
3. Teste endpoint: curl -X POST http://localhost:5000/api/send-email
```

---

## 📈 ESCALABILIDADE PARA MÚLTIPLOS CLIENTES

### ✅ Já Implementado:
- Rate limiting (100 req/min por IP)
- CORS configurado
- Error handling robusto
- Validação de entrada
- Compressão de assets

### 🔜 Para Escalar:
1. **Banco de dados real** (Firebase ou MongoDB)
2. **Cache** (Redis)
3. **CDN** (Cloudflare)
4. **Load balancer** (Vercel/Render automático)
5. **Observabilidade** (Sentry para erros)

---

## 📝 CHECKLIST PRÉ-DEPLOY

- [ ] Build rodando sem erros: `npm run build`
- [ ] Sem console.error em desenvolvimento
- [ ] .env.local criado com variáveis
- [ ] Credenciais de admin alteradas
- [ ] Domínio (se aplicável) DNS configurado
- [ ] HTTPS/SSL ativo
- [ ] Variáveis de ambiente configuradas no serviço
- [ ] Email de teste enviado com sucesso
- [ ] Login cliente funcionando
- [ ] Login admin funcionando
- [ ] Carrinho funcionando
- [ ] Firebase (se usar) configurado

---

## 🎯 DEPLOYMENT RÁPIDO

### Vercel (5 min)
```bash
# 1. Push para GitHub
git add .
git commit -m "Deploy version 1.0"
git push

# 2. Conectar no Vercel
# Dashboard > New Project > Selecionar repo
# Adicionar Environment Variables
# Deploy!
```

### Local/Docker (10 min)
```bash
# Build
npm run build

# Criar Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "server.js"]
EOF

# Build Docker
docker build -t carlshop .

# Run
docker run -p 5000:5000 carlshop
```

---

## 📞 SUPORTE PÓS-DEPLOYMENT

### Monitorar:
```bash
# Verificar status
curl https://seu-dominio.com/api/health

# Ver logs
# (Dashboard do seu serviço)

# Testar login
# Abrir https://seu-dominio.com e testar
```

---

**Data:** 18/12/2025  
**Versão:** 1.0  
**Status:** ✅ Pronto para Deploy
