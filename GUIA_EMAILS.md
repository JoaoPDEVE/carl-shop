# 📧 Guia de Configuração de Emails

## ✅ Status Atual

Sua chave Resend API já está configurada em `.env.local`:
```
VITE_RESEND_API_KEY=re_5mweAgb2_FAWeg3na1Egy5rWpUnZabyqV
```

## 🚀 Como Funciona Agora

1. **Quando um cliente compra:**
   - Preenche os dados no checkout
   - Clica em "Confirmar Compra"
   - O email é enviado **diretamente** via API Resend

2. **Email enviado:**
   - Para: Email do cliente (inserido no formulário)
   - Assunto: "🛒 Compra Confirmada - [Nome do Cliente]"
   - Contém: Dados do pedido, itens, total e data

## ⚙️ Mudanças Realizadas

### Antes ❌
- Código tentava enviar via servidor local (localhost:5000)
- Servidor backend (server.js) precisava estar rodando
- Não funcionava se o server não estivesse ligado

### Agora ✅
- Código envia **diretamente** via Resend API
- Sem necessidade de servidor backend
- Funciona sem depender de outro processo
- Simples e confiável

## 🔧 Testando

1. Faça um pedido de teste:
   - Vá para "Produtos"
   - Adicione ao carrinho
   - Clique em "Finalizar Compra"
   - Preencha os dados
   - Clique em "Confirmar Compra"

2. Abra o console (F12) e procure por:
   ```
   ✅ Email enviado com sucesso!
   ```

3. Verifique seu email (pode demorar alguns segundos)

## 📌 Informações Importantes

- **Domínio de origem:** `onboarding@resend.dev` (Resend padrão)
- **Limite:** 100 emails/dia no plano gratuito
- **Latência:** Normalmente 1-2 segundos

## 🔗 Recursos Úteis

- Resend Dashboard: https://resend.com/inbox
- Documentação: https://resend.com/docs
- Status de entrega: Verifique em resend.com/inbox

## ❓ Se Não Receber Email

1. **Verificar console (F12):**
   - Procure por erros vermelhos
   - Veja a mensagem do servidor

2. **Causas comuns:**
   - Email do cliente digitado errado
   - Chave API expirada
   - Limite diário atingido
   - Email marcado como spam

3. **Soluções:**
   - Gere nova chave em: https://resend.com/api-keys
   - Atualize em `.env.local`
   - Reinicie o servidor

---

**Última atualização:** 18 de Dezembro de 2025
