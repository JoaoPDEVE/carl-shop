# 🎯 REFERÊNCIAS DE DEPLOY

## 🔗 Plataformas Oficiais

### Vercel (Frontend)
- Homepage: https://vercel.com/
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

### Railway (Backend)
- Homepage: https://railway.app/
- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app/

### Firebase (Database)
- Homepage: https://firebase.google.com/
- Console: https://console.firebase.google.com/
- Docs: https://firebase.google.com/docs

### Resend (Email)
- Homepage: https://resend.com/
- Dashboard: https://resend.com/dashboard
- Docs: https://resend.com/docs

### GitHub (Repositório)
- Homepage: https://github.com/
- Novo Repositório: https://github.com/new

---

## 📚 Guias Passo a Passo

1. **Deploy Completo** → [DEPLOY_VERCEL_RAILWAY.md](DEPLOY_VERCEL_RAILWAY.md)
2. **Quick Start** → [DEPLOY_RAPIDO.md](DEPLOY_RAPIDO.md)
3. **Script de Push** → Execute: `push-to-github.bat`

---

## 🔑 Environment Variables Necessárias

### Para Vercel (Production Frontend)
```
VITE_BACKEND_URL=https://seu-backend-on-railway.app
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_RESEND_API_KEY=re_...
```

### Para Railway (Production Backend)
```
FRONTEND_URL=https://carlshop.vercel.app
VITE_RESEND_API_KEY=re_...
NODE_ENV=production
PORT=3000
```

---

## 📊 Tabela de Decisão

| Precisa de... | Solução | Custo | Tempo |
|---|---|---|---|
| Hospedar React | Vercel | Grátis | 2 min |
| Hospedar Express | Railway | Grátis | 2 min |
| Banco de Dados | Firebase | Grátis | 5 min |
| Enviar Emails | Resend | Grátis (100/dia) | 1 min |
| Domínio .com | Namecheap | ~R$40/ano | - |

---

## ✅ Checklist de Deploy

### Antes de começar
- [ ] Código compilado (npm run build)
- [ ] .env.local configurado localmente
- [ ] Conta GitHub criada
- [ ] Nenhum erro no console (npm run dev)

### GitHub
- [ ] Repositório criado
- [ ] `git init` executado
- [ ] `git remote add origin ...` configurado
- [ ] Primeiro push feito (`git push -u origin main`)

### Vercel
- [ ] Conta criada (sign up with GitHub)
- [ ] Projeto importado
- [ ] Environment variables adicionadas
- [ ] Deploy iniciado
- [ ] URL gerada (ex: carlshop.vercel.app)

### Railway
- [ ] Conta criada (sign up with GitHub)
- [ ] Projeto criado
- [ ] `server.js` detectado automaticamente
- [ ] Environment variables adicionadas
- [ ] Deploy iniciado
- [ ] URL gerada

### Conexão Frontend ↔ Backend
- [ ] `VITE_BACKEND_URL` configurada em Vercel
- [ ] Railway URL testada (`/api/health`)
- [ ] CORS funcionando (sem erros no F12)

### Testes Finais
- [ ] Frontend carrega
- [ ] Adiciona item ao carrinho
- [ ] Clica em Checkout
- [ ] Preenche formulário
- [ ] Email chega no inbox

---

## 🚀 Próximas Etapas (Depois de Pronto)

1. **Domínio Personalizado**
   - Comprar em: namecheap.com, registro.br, etc
   - Configurar em Vercel → Settings → Domains

2. **Real Firebase**
   - Criar projeto em firebase.google.com
   - Copiar credenciais reais
   - Atualizar em Vercel → Environment Variables

3. **Email Profissional**
   - Verificar domínio em Resend
   - Trocar `onboarding@resend.dev` por `noreply@seu-dominio.com`
   - Atualizar em DeliveryForm.jsx

4. **Certificado SSL**
   - Vercel e Railway fornecem automaticamente
   - Site sempre em HTTPS ✅

5. **Analytics (Opcional)**
   - Instalar Vercel Analytics
   - Sentry para error tracking

---

## 🆘 Troubleshooting Rápido

### "Erro ao fazer git push"
**Solução**: Adicionar remote primeiro
```
git remote add origin https://github.com/SEU_USUARIO/carlshop.git
git branch -M main
git push -u origin main
```

### "Vercel não encontra repositório"
**Solução**: Autorizar Vercel a acessar GitHub
```
https://vercel.com/integrations/github → Configure
```

### "Railway não inicia"
**Solução**: Verificar logs
```
Railroad → Deployment → View Logs
```

### "Email não chega"
**Solução**: Verificar chave Resend
```
Console (F12) → Network → send-email → Response
```

### "CORS Error"
**Solução**: Atualizar `VITE_BACKEND_URL`
```
DeliveryForm.jsx linha 73 recebe a variável corretamente
```

---

## 📞 Suporte Oficial

- **Vercel Support**: https://vercel.com/help
- **Railway Support**: https://railway.app/contact
- **Firebase Support**: https://firebase.google.com/support/
- **Resend Support**: https://resend.com/support

---

**Tudo pronto! Vamos ao ar! 🎉**
