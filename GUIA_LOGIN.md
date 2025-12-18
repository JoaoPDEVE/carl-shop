# 🔐 Guia Completo de Login - CARLSHOP

## Dois Tipos de Autenticação

### 1️⃣ **LOGIN CLIENTE** (Verde)
**Função:** Clientes normais que fazem compras e rastreiam pedidos.

- Clique em **"Login"** (botão laranja na barra superior)
- Você pode:
  - ✅ **Criar conta nova** (Registrar)
  - ✅ **Fazer login** com email/senha cadastrados
- Dados salvos em **localStorage** (modo demo, sem Firebase)

**Dados de Teste:**
```
Email: cliente@teste.com
Senha: 123456
Nome: João Cliente
```

**O que o Cliente pode fazer:**
- Ver catálogo de produtos
- Adicionar produtos ao carrinho
- Fazer checkout
- Ver seu perfil/conta

---

### 2️⃣ **LOGIN ADMIN** (Azul)
**Função:** Gerenciar a loja (produtos, games, pedidos).

- Clique em **"Admin"** (botão azul na barra superior, lado direito)
- Você vai para a **tela de login admin**

**Credenciais de Admin:**
```
Email: joaobjjpedro@gmail.com
Senha: mereejunior123.
```

**O que o Admin pode fazer:**
- ✅ Adicionar/editar/deletar games
- ✅ Adicionar/editar/deletar produtos
- ✅ Fazer upload de imagens
- ✅ Gerenciar estoque
- ✅ Ver pedidos (em desenvolvimento)

---

## 🎯 Fluxo Completo de Teste

### **Cenário 1: Cliente Novo**
1. Clique em "Login"
2. Clique em "📝 Criar uma agora"
3. Preencha: Nome, Email, Senha (mín 6 caracteres)
4. Clique "📝 Criar Conta"
5. Se sucesso: Será redirecionado ao site, logado
6. Veja seu email no topo da página (com ícone verde)

### **Cenário 2: Cliente Existente Faz Login**
1. Clique em "Login"
2. Preencha email e senha de uma conta criada
3. Clique "🔓 Entrar"
4. Se sucesso: Será logado automaticamente

### **Cenário 3: Cliente Faz Logout**
1. Clique no seu email (ícone verde no topo)
2. Clique "🚪 Sair da Conta"
3. Será deslogado

### **Cenário 4: Admin Login**
1. Clique em "Admin"
2. Preencha credenciais (veja acima)
3. Clique "✅ Entrar como Admin"
4. Será redirecionado ao painel admin

### **Cenário 5: Admin Logout**
1. Clique no avatar do Admin (topo)
2. Clique "Sair"
3. Será deslogado e retorna à home

---

## 🔍 Status de Funcionalidade

✅ **FUNCIONANDO:**
- Login/Logout de Cliente
- Registro de Cliente
- Persistência de dados em localStorage
- Login Admin
- Logout Admin
- Exibição correta de usuário logado
- Proteção de rotas (Admin só vê painel se logado como admin)

⏳ **EM DESENVOLVIMENTO:**
- Integração com Firebase (opcional)
- Recuperação de senha
- Histórico de pedidos do cliente
- Sistema de notificações

---

## 💾 Dados Persistidos

### Cliente (localStorage)
- **Chave:** `cartshop-client-user`
- **Dados:** `{ uid, email, displayName, createdAt }`

### Admin (localStorage)
- **Chave:** `cartshop-user`
- **Dados:** `{ id, name, email, isAdmin, joinDate, avatar }`

### Demo Users (localStorage - Modo Demo)
- **Chave:** `demo_users`
- **Dados:** Todas as contas criadas em modo demo

---

## ⚙️ Configuração Firebase (Opcional)

Se quiser usar Firebase real:

1. Crie projeto em `firebase.google.com`
2. Obtenha credenciais
3. Crie arquivo `.env.local` na raiz:
```
VITE_FIREBASE_API_KEY=sua_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket
VITE_FIREBASE_MESSAGING_ID=seu_id
VITE_FIREBASE_APP_ID=seu_app_id
```

4. Reinicie o servidor: `npm run dev`
5. Sistema vai usar Firebase automaticamente

---

## 🐛 Troubleshooting

### **Problema: Não consigo fazer login**
- ✅ Verifique se digitou email e senha corretos
- ✅ Para admin, use exatamente: `joaobjjpedro@gmail.com`
- ✅ Abra DevTools (F12) > Console e procure por erros

### **Problema: Logout não funciona**
- ✅ Atualize a página (Ctrl+F5 ou Cmd+Shift+R)
- ✅ Limpe localStorage: DevTools > Application > localStorage

### **Problema: Dados não persistem**
- ✅ Verifique se localStorage está habilitado
- ✅ Abra DevTools > Application > localStorage
- ✅ Procure por `cartshop-client-user` ou `cartshop-user`

### **Problema: Botão "Admin" não aparece**
- ✅ Em mobile, pode estar no menu hamburger
- ✅ Redimensione a tela para desktop

---

## 📞 Suporte

Se encontrar problemas:
1. Abra DevTools (F12)
2. Vá para a aba "Console"
3. Procure por mensagens de erro em vermelho
4. Screenshot do erro e envie para análise

---

**Versão:** 1.0  
**Data:** 18/12/2025  
**Status:** ✅ Pronto para Teste
