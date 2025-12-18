# 🔧 CONFIGURAÇÃO - Sistema de Email Resend

## 📧 Como Configurar o Resend

### 1. Criar Conta Resend
- Acesse: https://resend.com
- Crie uma conta gratuita
- Você receberá um saldo de crédito para testes

### 2. Obter Chave API
- No painel do Resend, vá para "API Keys"
- Copie sua chave (começa com `re_`)

### 3. Configurar no Projeto
- Abra o arquivo `.env.local` na raiz do projeto
- Substitua a linha:
  ```
  VITE_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
  ```
  Por sua chave real:
  ```
  VITE_RESEND_API_KEY=re_SEU_TOKEN_AQUI
  ```

### 4. Email de Teste
- Enquanto está em fase de teste, use: `onboarding@resend.dev`
- **Já está configurado assim no código!**
- Os emails são enviados para: `joaobjjpedro@gmail.com`

### 5. Verificar Problemas
- Abra o navegador (pressione F12)
- Vá para "Console"
- Faça uma compra teste
- Procure por mensagens:
  - ✅ `Email enviado com sucesso!` = funcionando
  - ❌ `Erro ao enviar email:` = problema

### 6. Troubleshooting

**Erro "unauthorized" ou "invalid_request_body":**
1. Verifique a chave API em `.env.local`
2. Reinicie o servidor: `npm run dev`

**Erro "Invalid email domain":**
- Use apenas `onboarding@resend.dev` na fase de testes

**Não recebe o email:**
1. Verifique SPAM/Lixeira do Gmail
2. Veja console do navegador (F12) para erros
3. Confirme a chave API em https://resend.com/api-keys

## ✅ Sistema Pronto!
Quando um cliente realiza uma compra:
- ✅ Preenche formulário de entrega
- ✅ Email é enviado automaticamente
- ✅ Dados salvos em localStorage
- ✅ Redirecionado ao pagamento

## 📊 Dados Recebidos por Email
- Nome completo
- Email do cliente
- Telefone/WhatsApp
- Usuário Discord
- Itens comprados (quantidade e preço)
- Total da compra
- Data e hora

**Email de destino:** joaobjjpedro@gmail.com  
**Email de origem (testes):** onboarding@resend.dev

**Webhook Discord foi completamente removido.**
