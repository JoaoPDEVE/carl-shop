# 🚀 Deploy Rápido em 5 Minutos

## Opção 1: Vercel (RECOMENDADO - Mais Fácil)

### Passo 1: Preparar GitHub
```bash
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
git add .
git commit -m "Deploy v1.0 - Todas as correções implementadas"
git push origin main
```

### Passo 2: Conectar Vercel
1. Acesse https://vercel.com/
2. Click em "Sign Up" (ou login se tiver conta)
3. Click em "Continue with GitHub"
4. Autorize Vercel acessar GitHub
5. Selecione o repositório do projeto
6. Vercel detectará Vite automaticamente

### Passo 3: Configurar Variáveis
1. Na tela de "Environment Variables", adicione:

```
VITE_FIREBASE_API_KEY=sua_chave_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu-projeto.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_RESEND_API_KEY=sua_chave_resend
FRONTEND_URL=seu-dominio-ou-vercel-url.vercel.app
```

2. Click "Deploy"

### Passo 4: Pronto!
- Vercel faz build e deploy automaticamente
- URL do site aparece na tela
- Deploy leva ~3-5 minutos

---

## Opção 2: Render (Grátis por 3 Meses)

### Passo 1: Preparar código
```bash
git add .
git commit -m "Deploy v1.0"
git push origin main
```

### Passo 2: Criar Web Service
1. Acesse https://render.com/
2. Click "New +"
3. Selecione "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name:** carlshop-frontend
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start` (deve ter server.js)

### Passo 3: Environment Variables
Adicione na aba "Environment":
```
VITE_FIREBASE_API_KEY=sua_chave
(mesmas do Vercel)
```

### Passo 4: Deploy
Click "Create Web Service" - Pronto!

---

## Opção 3: Railway (Recomendado se já tem conta)

### Passo 1: Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### Passo 2: Login
```bash
railway login
```

### Passo 3: Inicializar Projeto
```bash
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
railway init
```

### Passo 4: Deploy
```bash
git push
railway up
```

---

## ✅ Verificar Após Deploy

1. **Abra o site no navegador**
   - Página carrega? ✓

2. **Teste Login Admin**
   - Email: `joaobjjpedro@gmail.com`
   - Senha: `mereejunior123.`
   - Consegue acessar painel? ✓

3. **Teste Carrinho**
   - Adiciona produto? ✓
   - Remove produto? ✓

4. **Teste Checkout**
   - Formulário valida email? ✓
   - Formulário valida telefone? ✓
   - Email é enviado? ✓

5. **Responsividade**
   - Abra em mobile
   - Layout funciona? ✓

---

## 🔧 Troubleshooting

### "Build failed"
- Verificar .env está com variáveis corretas
- Rodar `npm run build` localmente para debug

### "Site não carrega"
- Verificar FRONTEND_URL no .env
- Confirmar URL está correta (com protocolo https://)

### "Emails não chegam"
- Confirmar VITE_RESEND_API_KEY está correto
- Testar key no console: `await fetch('http://localhost:5000/api/send-email', ...)`

### "Firebase não sincroniza"
- Verificar credenciais Firebase no .env
- Confirmar Realtime Database está ativado no Firebase Console
- Verificar regras de segurança do Firebase

---

## 📝 Checklist Final

Antes de deploy final:

- [ ] GitHub atualizado com todas mudanças
- [ ] .env.local tem valores reais
- [ ] `npm run build` roda sem erros localmente
- [ ] Testou login, carrinho, checkout
- [ ] Testou responsividade em mobile
- [ ] Firebase credenciais estão corretas
- [ ] Resend API key é válida

---

## 🎉 Pronto!

Se tudo passou, seu site está no ar! 🚀

**URLs úteis após deploy:**
- Seu site: https://seu-dominio.vercel.app
- Firebase Console: https://console.firebase.google.com
- Resend Dashboard: https://resend.com/emails
- Vercel Dashboard: https://vercel.com/dashboard

---

## 📞 Suporte

Se der problema:
1. Verificar logs da plataforma (Vercel/Render/Railway)
2. Abrir DevTools (F12) e verificar Console
3. Verificar Network tab se requests estão falhando
4. Testar localmente com `npm run dev`
