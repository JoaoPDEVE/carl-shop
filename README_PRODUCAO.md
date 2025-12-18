# 🎮 CARLSHOP - Loja de Itens Roblox

**Versão:** 1.0.0  
**Status:** ✅ Pronto para Produção  
**Data:** 18/12/2025

---

## ⚡ Quick Start (Rápido)

### Desenvolvimento
```bash
npm install
npm run dev
```
Acesse: http://localhost:3000

### Produção
```bash
npm install
npm run build
npm run start
```
Acesse: http://localhost:5000

---

## 🎯 Features

✅ **Múltiplos Clientes**
- Registro e login de clientes
- Carrinho de compras persistente
- Histórico de pedidos (demo)

✅ **Painel Admin**
- Adicionar/editar/deletar games
- Gerenciar produtos e estoque
- Upload de imagens
- Sistema de categorização

✅ **Segurança**
- Rate limiting (100 req/min)
- CORS configurado
- Validação de entrada
- Error handling robusto

✅ **Responsivo**
- Mobile-first design
- Funciona em todos os dispositivos
- PWA ready

---

## 🔑 Credenciais Padrão

### Admin
```
Email: joaobjjpedro@gmail.com
Senha: mereejunior123.
```

### Cliente
```
Registre-se pelo botão "Login"
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── Admin.jsx      # Painel administrativo
│   ├── Auth.jsx       # Login admin
│   ├── ClientAuth.jsx # Login cliente
│   ├── Cart.jsx       # Carrinho de compras
│   ├── Checkout.jsx   # Finalizar compra
│   └── ...
├── authClient.js      # Firebase auth
├── authClientDemo.js  # Demo auth (sem Firebase)
└── App.jsx           # App principal

public/
└── images/           # Assets estáticos

dist/                 # Build de produção

server.js             # API backend
server-prod.js        # Servidor de produção
```

---

## 🚀 Deployment

### Opção 1: Vercel (Recomendado)
1. Push para GitHub
2. Conecte em https://vercel.com
3. Configure variáveis de ambiente
4. Deploy automático!

### Opção 2: Render
1. Conecte GitHub em https://render.com
2. Crie novo Web Service
3. Configure build/start commands
4. Deploy automático!

### Opção 3: Railway
1. Acesse https://railway.app
2. Conecte seu repositório
3. Deploy automático!

Veja [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) para detalhes completos.

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env.local`:
```bash
cp .env.example .env.local
```

Edite com suas chaves:
- VITE_FIREBASE_API_KEY
- VITE_RESEND_API_KEY
- FRONTEND_URL (produção)

---

## 🧪 Testes

### Login Cliente
1. Clique "Login" no topo
2. Registre-se ou faça login
3. Adicione produtos ao carrinho

### Login Admin
1. Clique "Admin"
2. Use credenciais padrão
3. Manage games/produtos

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 📊 Performance

- Bundle: ~570 KB (gzip: 140 KB)
- CSS: ~43 KB (gzip: 7 KB)
- Lighthouse: ⚡ 85+

---

## 🐛 Troubleshooting

### Problema: "Módulos não encontrados"
```bash
rm -rf node_modules && npm install
```

### Problema: "Port 3000 já em uso"
```bash
# Mude a porta
vite --port 3001
```

### Problema: "Firebase error"
- Use modo demo (padrão)
- Ou configure chaves Firebase em .env.local

---

## 📞 Suporte

- Veja [GUIA_LOGIN.md](GUIA_LOGIN.md) para login
- Veja [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) para deploy
- Veja [GUIA_SISTEMA_JOGOS.md](GUIA_SISTEMA_JOGOS.md) para admin

---

## 📝 Changelog

### v1.0.0 (18/12/2025)
- ✅ Sistema de autenticação funcional
- ✅ Login cliente e admin
- ✅ Carrinho de compras
- ✅ Painel admin
- ✅ Rate limiting e CORS
- ✅ Build otimizado para produção

---

## 📄 Licença

Proprietário - CARLSHOP

---

**Desenvolvido com ❤️ para a comunidade Roblox**
