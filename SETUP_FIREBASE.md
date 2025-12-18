# 🔥 Configurar Firebase para Login de Clientes

## ❌ Erro Atual
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

**Causa:** O `.env.local` está vazio (sem credenciais Firebase)

---

## ✅ Passo 1: Criar Projeto Firebase

1. Acesse **https://firebase.google.com**
2. Clique em **"Go to console"** (canto superior direito)
3. Faça login com sua conta Google
4. Clique em **"Create a project"**
5. Preencha:
   - **Project name**: `carlshop`
   - **Google Analytics**: Desabilitar
6. Clique em **"Create project"** e aguarde (2-3 minutos)

---

## ✅ Passo 2: Obter Credenciais

1. No console Firebase, clique em **⚙️ Configurações do Projeto** (ícone de engrenagem)
2. Vá para a guia **"Geral"**
3. Role até **"Seus apps"**
4. Se não houver app, clique em **"Adicionar app"** → **Web (</> )**
5. Nome: `CARLSHOP`
6. **COPIE o código JavaScript que aparecerá**

Você verá algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...", 
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto.firebaseio.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## ✅ Passo 3: Ativar Authentication

1. Menu lateral → **"Authentication"**
2. Clique em **"Get started"** ou **"Começar"**
3. Selecione **"Email/Password"**
4. Ative o toggle
5. Clique **"Save"**

---

## ✅ Passo 4: Ativar Realtime Database

1. Menu lateral → **"Realtime Database"**
2. Clique **"Create Database"**
3. Localização: **southamerica-east1** (São Paulo, Brasil)
4. Modo: **"Start in test mode"**
5. Clique **"Enable"**

---

## ✅ Passo 5: Preencher .env.local

Abra o arquivo `.env.local` que fica na raiz do projeto

**Caminho completo:** 
```
c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS\.env.local
```

**Substitua pelos seus valores do Firebase:**

```env
# Firebase Configuration - COPIE DO FIREBASE CONSOLE
VITE_FIREBASE_API_KEY=AIzaSyD1234567890ABCDEFGHIJK
VITE_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://meu-projeto.firebaseio.com
VITE_FIREBASE_PROJECT_ID=meu-projeto-123
VITE_FIREBASE_STORAGE_BUCKET=meu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Email Service (já configurado)
VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
```

### ⚠️ Regras Importantes:
- ❌ **NÃO** coloque aspas: `"AIzaSyD..."`
- ❌ **NÃO** coloque chaves: `{ apiKey: ... }`
- ✅ **SIM** copie o valor exato do Firebase
- ✅ **SIM** salve o arquivo após editar
- ✅ **SIM** reinicie o servidor depois

---

## ✅ Passo 6: Reiniciar Servidor

Feche e abra novamente o terminal:

```bash
npm run dev
```

---

## 🧪 Testar Login de Cliente

1. Abra **http://localhost:3000**
2. Clique no botão **"Login"** (laranja)
3. Clique em **"Registrar"**
4. Preencha:
   - **Nome**: `Teste Cliente`
   - **Email**: `teste@exemplo.com`
   - **Senha**: `123456`
5. Clique em **"Registrar"**

**Esperado:** ✅ "Conta criada com sucesso!"

---

## ❌ Se não funcionar:

- [ ] Verifique se copiou as 7 variáveis do Firebase
- [ ] Verifique se não há espaços extras no `.env.local`
- [ ] Verifique se Authentication está **ativada**
- [ ] Verifique se Realtime Database está **ativada**
- [ ] Reinicie o servidor: `npm run dev`
- [ ] Limpe cache: `Ctrl+Shift+Del` no navegador
- [ ] Abra DevTools (`F12`) para ver erros

---

## 📍 Localização dos Botões no Firebase

```
Firebase Console
  ├─ Configurações (⚙️) → Geral → "Seus apps" → Copie credenciais
  ├─ Authentication → Email/Password → Ativar
  └─ Realtime Database → Criar → Ativar
```

---

## ✅ Quando Funcionar

Você verá:
- ✅ Botão "Login" com opções "Admin" (azul) e "Cliente" (laranja)
- ✅ Modal de login/registro funcionando
- ✅ Novo usuário criado no Firebase Auth
- ✅ Dados salvos no Realtime Database

## PASSO 2: Ativar Realtime Database (2 minutos)

1. No menu esquerdo, clique em "Realtime Database"
2. Clique em "Criar banco de dados"
3. Região: South America (São Paulo)
4. Modo: **Iniciar no modo de testes**
5. Criar

## PASSO 3: Ativar Authentication (1 minuto)

1. No menu esquerdo, clique em "Authentication"
2. Clique em "Começar"
3. Selecione "Email/Password"
4. Ativar email e desativar link de login
5. Salvar

## PASSO 4: Copiar Credenciais (3 minutos)

1. Clique no ícone de engrenagem (Configurações)
2. Vá para "Configurações do projeto"
3. Na aba "Geral", scroll para baixo até "Seus apps"
4. Se não houver app, clique em "</>" para criar um app web
5. Copiar o objeto `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "seu-project.firebaseapp.com",
  databaseURL: "https://seu-project.firebaseio.com",
  projectId: "seu-project-id",
  storageBucket: "seu-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

## PASSO 5: Adicionar ao .env.local

Criar arquivo `.env.local` na raiz do projeto:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=seu-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://seu-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

## PASSO 6: Testar Conexão

1. Reiniciar `npm run dev`
2. Abrir console do navegador (F12)
3. Procurar por "🔥 Firebase inicializado"

✅ Se aparecer, está funcionando!

---

## ⚠️ SEGURANÇA - Regras Iniciais

Enquanto testa, use este `.test` mode. **EM PRODUÇÃO**, adicione estas regras na aba "Regras" do Realtime Database:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "games": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$orderid": {
        ".read": "root.child('admins').child(auth.uid).exists() || data.child('userId').val() === auth.uid"
      }
    },
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid || root.child('admins').child(auth.uid).exists()",
        ".write": "auth.uid === $uid"
      }
    }
  }
}
```

---

## 🎯 PRÓXIMOS PASSOS

Após configurar:
1. Reiniciar App.jsx para usar Firebase
2. Criar páginas de registro/login
3. Dashboard do cliente com histórico de pedidos
4. Admin dashboard com vendas

---

## 🆘 TROUBLESHOOTING

**"Module not found: firebase"**
- Execute: `npm install firebase`

**"Firebase config is undefined"**
- Verificar se .env.local está na raiz (não em src/)
- Verificar se variáveis estão corretas

**"ERR_MODULE_NOT_FOUND"**
- Deletar node_modules: `rm -r node_modules`
- Reinstalar: `npm install`

**"auth/invalid-api-key"**
- API key pode estar incorreta
- Verificar em Firebase → Configurações do Projeto

---

✅ Pronto! Firebase está configurado!
