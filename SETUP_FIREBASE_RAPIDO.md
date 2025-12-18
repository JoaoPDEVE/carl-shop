# 🔥 Setup Firebase em 5 Minutos

## ⏱️ TEMPO TOTAL: 5 MINUTOS

---

## PASSO 1️⃣: Criar Projeto Firebase (2 min)

### 1.1 Abra Firebase Console
```
Abra: https://firebase.google.com/
```

### 1.2 Criar Novo Projeto
1. Click em **"Get started"** ou **"Ir para Console"**
2. Click em **"Create project"**
3. Nome do projeto: **`carl-shop-roblox`**
4. Deixe selecionado: **✓ Enable Google Analytics** (opcional)
5. Click **"Create project"** e aguarde 30 segundos

### 1.3 Copiar Credenciais
1. Na dashboard, procure: **⚙️ (Settings)** no canto inferior esquerdo
2. Click em **"Project settings"**
3. Abra a aba **"General"**
4. Role para baixo até **"Your apps"**
5. Se não houver nenhum app, click em **"Web"** (ícone: `</>`
6. Se houver, clique no app Web existente
7. Você verá uma config JavaScript assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "carl-shop-roblox.firebaseapp.com",
  databaseURL: "https://carl-shop-roblox-default-rtdb.firebaseio.com",
  projectId: "carl-shop-roblox",
  storageBucket: "carl-shop-roblox.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**COPIE TODOS ESSES VALORES!** ↑

---

## PASSO 2️⃣: Habilitar Realtime Database (1 min)

1. Na dashboard Firebase, no menu esquerdo: **"Build"** → **"Realtime Database"**
2. Click em **"Create Database"**
3. Localização: **`South America (sa-east-1)`** ou **`US (us-central1)`**
4. Modo: **"Start in test mode"** (por enquanto)
5. Click **"Enable"**

✅ Banco de dados criado!

---

## PASSO 3️⃣: Habilitar Authentication (1 min)

1. No menu esquerdo: **"Build"** → **"Authentication"**
2. Click em **"Get started"**
3. Procure por: **"Email/Password"**
4. Click nele
5. Click em **"Enable"**
6. Click **"Save"**

✅ Autenticação ativada!

---

## PASSO 4️⃣: Copiar e Colar no `.env.local` (1 min)

### 4.1 Abra o arquivo `.env.local`
```
Arquivo: c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS\.env.local
```

### 4.2 Substitua as linhas VAZIAS

**ENCONTRE ISSO:**
```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**SUBSTITUA POR (do Firebase Config acima):**
```dotenv
VITE_FIREBASE_API_KEY=AIzaSy... (copie o apiKey)
VITE_FIREBASE_AUTH_DOMAIN=carl-shop-roblox.firebaseapp.com (copie authDomain)
VITE_FIREBASE_DATABASE_URL=https://carl-shop-roblox-default-rtdb.firebaseio.com (copie databaseURL)
VITE_FIREBASE_PROJECT_ID=carl-shop-roblox (copie projectId)
VITE_FIREBASE_STORAGE_BUCKET=carl-shop-roblox.appspot.com (copie storageBucket)
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (copie messagingSenderId)
VITE_FIREBASE_APP_ID=1:123456789:web:abc123 (copie appId)
```

### 4.3 Salve o arquivo
```
Ctrl + S
```

---

## ✅ PRONTO!

Agora:
1. Reinicie o servidor: **Ctrl + C** e **npm run dev**
2. Recarregue o navegador: **F5**
3. Teste o login/admin
4. Verifique se Firebase sincroniza (veja Console do navegador)

---

## 🔍 Como Verificar se Funcionou?

Abra DevTools (F12) no navegador:

### Console Tab
Procure por mensagens como:
```
✅ "🔥 Firebase inicializado com credenciais reais"
```

### Application Tab → Firebase
Você deve ver dados do Firebase sendo salvos lá

---

## 📸 Referência Visual

### Firebase Console
```
Dashboard > Realtime Database > ✅ Criado
Dashboard > Authentication > ✅ Ativado
Dashboard > Project Settings > Copiar valores
```

### .env.local
```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
(etc...)
```

---

## 🆘 Se Algo Der Errado

### "Firebase não inicializa"
- Verificar se todos os 7 valores em `.env.local` estão preenchidos
- Nenhum pode estar vazio!

### "Erro de autenticação"
- Confirmar que Authentication está ativado (com Email/Password)

### "Banco de dados não persiste"
- Confirmar que Realtime Database está criado
- Verificar regras de segurança (Test mode = OK por enquanto)

### "Ainda vê 'demo-key'"
- Reiniciar servidor: **Ctrl + C** na terminal
- Depois: **npm run dev**
- Depois: **F5** no navegador

---

## ⏮️ Pronto? Volta aqui e me avisa! 🎉
