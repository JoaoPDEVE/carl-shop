# 🚀 COMEÇAR DEPLOY AGORA - 3 Passos

> Tempo total: **~10 minutos**

---

## 🔴 PASSO 1: Git + GitHub (5 min)

### Opção A: Usar Script (MAIS FÁCIL)
```powershell
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\setup-git.ps1
```

### Opção B: Manual
```powershell
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
git init
git add .
git commit -m "Deploy v1.0"
git remote add origin https://github.com/SEU_USUARIO/carlshop.git
git push -u origin main
```

✅ **Resultado**: Código no GitHub

---

## 🟠 PASSO 2: Frontend (2 min)

1. Acesse: https://vercel.com/
2. Clique **"Sign Up with GitHub"**
3. Autorize e busque `carlshop`
4. Clique **Import**
5. Adicione Environment Variables (copie de `.env.local`)
6. Clique **Deploy**

✅ **Resultado**: Site em `https://carlshop.vercel.app`

---

## 🟡 PASSO 3: Backend (2 min)

1. Acesse: https://railway.app/
2. Clique **"New Project"**
3. Selecione **"Deploy from GitHub"**
4. Busque `carlshop`
5. Railway detecta automaticamente
6. Adicione Environment Variables
7. Clique **Deploy**

✅ **Resultado**: Backend em `https://seu-backend-on-railway.app`

---

## 🟢 PASSO 4: Conectar (1 min)

1. Volte no Vercel
2. Settings → Environment Variables
3. Edite `VITE_BACKEND_URL`
4. Troque por URL do Railway
5. Salve → Auto-redeploy

✅ **PRONTO!** Site está LIVE! 🎉

---

## 📱 Testar

```
https://carlshop.vercel.app

1. Adicione item ao carrinho
2. Clique Checkout
3. Preencha formulário
4. Envie
5. Verifique email recebido
```

---

## 📖 Se Precisar de Ajuda

| Dúvida | Link |
|-------|------|
| GitHub detalhado | [GITHUB_SETUP_PT.md](GITHUB_SETUP_PT.md) |
| Deploy completo | [DEPLOY_VERCEL_RAILWAY.md](DEPLOY_VERCEL_RAILWAY.md) |
| Referências | [REFERENCIAS_DEPLOY.md](REFERENCIAS_DEPLOY.md) |
| Status completo | [PRONTO_PARA_DEPLOY.md](PRONTO_PARA_DEPLOY.md) |

---

## 🎯 URLs Importantes

- **GitHub**: https://github.com/
- **Vercel**: https://vercel.com/
- **Railway**: https://railway.app/
- **Firebase**: https://console.firebase.google.com/
- **Resend**: https://resend.com/dashboard

---

**VAMOS LANÇAR! 🚀**

Qualquer dúvida, consulte os guias acima.

