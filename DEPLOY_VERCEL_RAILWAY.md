# 🚀 Deploy COMPLETO - Vercel + Railway

> **Tudo é GRÁTIS! Sem cobranças!** ✅

---

## 📋 PASSO 1: Preparar GitHub

### 1.1 - Instalar Git (se não tiver)
```powershell
# Baixe em: https://git-scm.com/download/win
# Abra PowerShell como Admin e digite:
git --version  # Confirma se está instalado
```

### 1.2 - Configurar Git (primeira vez)
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 1.3 - Preparar repositório local
```powershell
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"

# Se não tiver .git ainda
git init

# Adicionar todos os arquivos
git add .

# Criar commit
git commit -m "Deploy v1.0 - CARLSHOP"
```

### 1.4 - Criar repositório no GitHub
1. Acesse https://github.com/new
2. Digite o nome: `carlshop` (ou qualquer outro)
3. Deixe **Private** ou **Public** (recomendo Private para começar)
4. Clique **Create repository**
5. Copie os comandos que aparecem

### 1.5 - Conectar ao GitHub
```powershell
# Copie e execute EXATAMENTE o que GitHub forneceu, tipo:
git remote add origin https://github.com/SEU_USUARIO/carlshop.git
git branch -M main
git push -u origin main
```

✅ **Seu código está no GitHub agora!**

---

## 🎯 PASSO 2: Deploy Frontend no Vercel

### 2.1 - Criar conta Vercel
1. Acesse https://vercel.com/
2. Clique **"Sign Up"** → Selecione **GitHub**
3. Autorize Vercel a acessar GitHub

### 2.2 - Deploy automático
1. Clique **"Add New..."** → **"Project"**
2. Selecione seu repositório `carlshop`
3. Clique **Import**

### 2.3 - Configurar Environment Variables
Na página de configuração, clique em **Environment Variables** e adicione:

```
VITE_BACKEND_URL=https://seu-backend-railway.onrender.com
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyForLocalTesting1234567890AB
VITE_FIREBASE_AUTH_DOMAIN=carl-shop-roblox-demo.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://carl-shop-roblox-demo-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=carl-shop-roblox-demo
VITE_FIREBASE_STORAGE_BUCKET=carl-shop-roblox-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
```

> ⚠️ **IMPORTANTE**: Troque `seu-backend-railway.onrender.com` pela URL real do Railway depois!

### 2.4 - Deploy
1. Clique **Deploy**
2. Aguarde ~2 minutos
3. Você verá: ✅ **Congratulations! Your project has been successfully deployed**
4. Seu site está em: `https://carlshop.vercel.app` (ou similar)

✅ **Frontend no ar!**

---

## 🔧 PASSO 3: Deploy Backend no Railway

### 3.1 - Criar conta Railway
1. Acesse https://railway.app/
2. Clique **"Start New Project"**
3. Clique **"Deploy from GitHub"**

### 3.2 - Conectar GitHub
1. Autorize Railway a acessar GitHub
2. Selecione seu repositório `carlshop`
3. Clique **Deploy now**

### 3.3 - Railway detecta server.js automaticamente
```
✅ Detectado: Node.js
✅ Entry point: server.js
✅ Build: npm install
✅ Start: node server.js
```

### 3.4 - Adicionar Environment Variables
1. No painel Railway, vá em **Variables**
2. Adicione:

```
FRONTEND_URL=https://carlshop.vercel.app
NODE_ENV=production
PORT=3000
VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
```

### 3.5 - Copiar URL do Backend
1. Railway gera automaticamente uma URL
2. Procure por algo como: `https://seu-backend-on-railway.up.railway.app`
3. **Copie essa URL**

✅ **Backend rodando!**

---

## 🔗 PASSO 4: Conectar Frontend ↔ Backend

### 4.1 - Atualizar Vercel com URL do Railway
1. Volte em https://vercel.com/
2. Clique no projeto `carlshop`
3. Vá em **Settings** → **Environment Variables**
4. Edite a variável `VITE_BACKEND_URL`
5. Troque por: `https://seu-backend-on-railway.app`
6. Clique **Save**

### 4.2 - Trigger redeploy automático
```powershell
# No seu computador, faça um commit dummy
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"

git add .
git commit --allow-empty -m "Trigger redeploy - Backend URL updated"
git push origin main
```

Vercel vai fazer redeploy automático em ~1 minuto ✅

---

## ✅ Verificação Final

### 5.1 - Testar Frontend
```
Acesse: https://carlshop.vercel.app
- Homepage carrega?
- Catálogo aparece?
- Botões funcionam?
```

### 5.2 - Testar Backend
```
Acesse: https://seu-backend-on-railway.app/api/health

Deve retornar:
{
  "status": "✅ OK",
  "timestamp": "2025-12-18T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### 5.3 - Testar Checkout
1. Adicione um item ao carrinho
2. Clique **Checkout**
3. Preencha o formulário
4. Clique **Enviar**
5. Deve enviar email e mostrar "✅ Email enviado com sucesso"

---

## 📊 URLs Finais

Depois de pronto:
| Component | URL |
|-----------|-----|
| **Frontend** | https://carlshop.vercel.app |
| **Backend** | https://seu-backend-on-railway.app |
| **Painel Vercel** | https://vercel.com/seu-usuario/carlshop |
| **Painel Railway** | https://railway.app/ |

---

## 💡 Próximos Passos (Opcional)

### Comprar Domínio Personalizado
- **Domínio .com**: ~R$40/ano em Namecheap
- **Domínio .com.br**: ~R$30/ano em registro.br
- Depois, conectar em Vercel (Settings → Domains)

### Configurar Real Firebase
1. Ir em https://firebase.google.com/
2. Criar novo projeto
3. Copiar credenciais reais
4. Atualizar no Vercel Environment Variables

### Configurar Email Profissional
1. Ir em https://resend.com
2. Verificar domínio
3. Trocar `onboarding@resend.dev` por `noreply@seu-dominio.com`

---

## 🆘 Troubleshooting

**"Email não chega"**
- ✅ Chave Resend está configurada? (`re_...`)
- ✅ Backend health check funciona?
- ✅ Verifica console do navegador (F12) para erros

**"Backend não responde"**
- Railway parou? Clique **Deploy** novamente
- Verifica se `VITE_BACKEND_URL` está correto

**"Erro de CORS"**
- Backend precisa aceitar requisições de `https://carlshop.vercel.app`
- Verifica `server.js` linha 16-21 (CORS configurado?)

---

## 🎉 Pronto!

**Seu site está LIVE!** 🚀

- ✅ Grátis (Firebase, Vercel, Railway, Resend)
- ✅ Escalável (cresce automaticamente)
- ✅ Seguro (HTTPS, rate limiting)
- ✅ Profissional (domínio próprio opcional)

Compartilhe o link com clientes! 🎮

