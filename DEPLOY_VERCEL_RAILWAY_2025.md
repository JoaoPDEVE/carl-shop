# 🚀 Deploy Vercel + Railway - CARLSHOP

## ⚡ Quick Deploy (5-10 minutos)

---

## PASSO 1️⃣ - Deploy Frontend no Vercel

### Opção A: Conectar GitHub (Recomendado)

1. Acesse: https://vercel.com/
2. Clique em **"Sign Up"** → Escolha **"Continue with GitHub"**
3. Autorize o Vercel a acessar seus repositórios
4. Após login, clique em **"New Project"**
5. Procure e selecione o repositório **`carl-shop`**
6. Clique em **"Import"**

### Configurar Environment Variables

7. Na tela de configuração, vá para **"Environment Variables"**
8. Adicione a variável:
   ```
   Nome: VITE_BACKEND_URL
   Valor: (deixe em branco por enquanto, você preencherá após fazer deploy do Railway)
   ```
9. Clique em **"Deploy"**

✅ Seu site estará disponível em: `https://seu-projeto.vercel.app`

---

## PASSO 2️⃣ - Deploy Backend no Railway

### 1. Criar conta no Railway

1. Acesse: https://railway.app/
2. Clique em **"Start Project"** ou **"Sign Up"**
3. Escolha **"Sign in with GitHub"**
4. Autorize o acesso

### 2. Criar novo projeto

5. Clique em **"New Project"** (ou "Create")
6. Escolha **"Deploy from GitHub repo"**
7. Selecione o repositório **`carl-shop`**
8. Clique em **"Deploy Now"**

Railway vai detectar automaticamente que é um projeto Node.js e fazer o deploy.

### 3. Configurar variáveis de ambiente

9. No painel do Railway, clique em **"Variables"**
10. Clique em **"RAW Editor"** e adicione:
    ```
    VITE_FIREBASE_API_KEY=AIzaSyDemoKeyForLocalTesting1234567890AB
    VITE_FIREBASE_AUTH_DOMAIN=carl-shop-roblox-demo.firebaseapp.com
    VITE_FIREBASE_DATABASE_URL=https://carl-shop-roblox-demo-default-rtdb.firebaseio.com
    VITE_FIREBASE_PROJECT_ID=carl-shop-roblox-demo
    VITE_FIREBASE_STORAGE_BUCKET=carl-shop-roblox-demo.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
    VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
    VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
    ```

11. Clique em **"Save"**

### 4. Obter URL do Backend

12. Na página do projeto, procure por **"Deployments"** ou **"Settings"**
13. Procure por algo como **`railway-app-xxxxx.railway.app`** ou similar
14. Copie essa URL

---

## PASSO 3️⃣ - Atualizar VITE_BACKEND_URL no Vercel

1. Volte para o painel do Vercel
2. Vá para **"Settings"** → **"Environment Variables"**
3. Clique em **"VITE_BACKEND_URL"** e edite
4. Mude o valor para: `https://seu-railway-url.railway.app`
5. Clique em **"Save"**

Railway vai redeploy automaticamente após detectar a mudança.

---

## PASSO 4️⃣ - Testar Deployment

### Frontend (Vercel)
- Acesse: `https://seu-projeto.vercel.app`
- Teste: Login, carrinho, checkout

### Backend (Railway)
- Faça uma compra de teste
- Verifique se os emails chegam (Resend)
- Confira se os dados aparecem no Firebase

---

## 🐛 Troubleshooting

### Deploy falhou?
- Verifique se há arquivos `.env.local` no git (não deveria)
- Confirme que `package.json` tem o script `build`

### VITE_BACKEND_URL não funciona?
- Confirme a URL do Railway está correta
- Teste em: `https://sua-url-railway.railway.app/api/health`

### Emails não chegam?
- Confirme API key do Resend está correta
- Verifique a aba "Email" do Resend.com

### Produtos não aparecem?
- Confirme Firebase URL no `.env`
- Verifique as regras de segurança do Firebase

---

## 📋 Checklist Final

- [ ] Frontend deployado no Vercel
- [ ] Backend deployado no Railway
- [ ] VITE_BACKEND_URL atualizado no Vercel
- [ ] Teste de login funcionando
- [ ] Teste de carrinho funcionando
- [ ] Teste de email funcionando
- [ ] Dados salvando no Firebase

---

## 🎉 Pronto!

Seu CARLSHOP está live em produção!

**Frontend:** https://seu-projeto.vercel.app  
**Backend:** https://seu-railway-url.railway.app

---

## 📞 URLs Importantes

- Vercel: https://vercel.com/dashboard
- Railway: https://railway.app/dashboard
- GitHub: https://github.com/JoaoPDEVE/carl-shop
- Firebase: https://console.firebase.google.com/
- Resend: https://resend.com/

---

**Última atualização:** 18/12/2025  
**Status:** ✅ Pronto para deploy
