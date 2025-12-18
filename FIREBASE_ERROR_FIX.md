## 🔥 ERRO FIREBASE - SOLUÇÃO RÁPIDA

### Problema
```
❌ Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

### Causa
O arquivo `.env.local` está **vazio** ou com credenciais inválidas.

### Solução em 3 Passos

#### 1️⃣ Abra o arquivo `.env.local`
```
c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS\.env.local
```

#### 2️⃣ Obtenha credenciais em https://firebase.google.com/
- Crie um projeto (ou use existente)
- Ative "Authentication" → Email/Password
- Ative "Realtime Database"
- Copie as credenciais

#### 3️⃣ Preencha o `.env.local`
```env
VITE_FIREBASE_API_KEY=sua-api-key-aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu-projeto.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
```

#### 4️⃣ Reinicie o servidor
```bash
npm run dev
```

### ✅ Pronto!
O login de clientes agora funcionará!

---

**Dúvidas?** Veja o arquivo `SETUP_FIREBASE.md` para instruções completas passo a passo.
