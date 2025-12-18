# 🔐 Como Fazer Deploy no GitHub

## 1️⃣ Criar Conta GitHub (5 minutos)

Acesse: https://github.com/signup

1. Clique **"Sign up"**
2. Digite um **email** que você usa
3. Crie uma **senha forte**
4. Digite um **username** (ex: `joaobrito` ou `carlshop-admin`)
5. Responda as perguntas
6. Verifique o email
7. ✅ Conta criada!

---

## 2️⃣ Criar Repositório (2 minutos)

Acesse: https://github.com/new

1. **Repository name**: Digite `carlshop`
2. **Description** (opcional): "Loja de Roblox - CARLSHOP"
3. **Private ou Public?**
   - ✅ **Private** (recomendado) = Apenas você vê
   - ❌ **Public** = Todos podem ver o código
4. Clique **Create repository**

---

## 3️⃣ Configurar Git Local (Primeira Vez)

### 3.1 - Instalar Git
Baixe em: https://git-scm.com/download/win

Abra PowerShell como **Administrador** e digite:
```powershell
git --version
```

Se aparecer algo tipo `git version 2.x.x`, está instalado ✅

### 3.2 - Configurar Sua Identidade

Abra PowerShell e digite:
```powershell
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu@email.com"
```

Exemplo:
```powershell
git config --global user.name "João Brito"
git config --global user.email "joaobjjpedro@gmail.com"
```

---

## 4️⃣ Fazer Primeiro Push (5 minutos)

### 4.1 - Abrir PowerShell na Pasta do Projeto

```powershell
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"
```

### 4.2 - Inicializar Git (PRIMEIRA VEZ APENAS)

```powershell
git init
```

Saída esperada: `Initialized empty Git repository in C:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS\.git`

### 4.3 - Adicionar Todos os Arquivos

```powershell
git add .
```

Sem saída = sucesso ✅

### 4.4 - Criar Primeiro Commit

```powershell
git commit -m "Deploy v1.0 - CARLSHOP"
```

Saída esperada:
```
[main (root-commit) abc1234] Deploy v1.0 - CARLSHOP
 X files changed, X insertions(+)
```

### 4.5 - Adicionar Remote do GitHub

Copie EXATAMENTE o comando que GitHub mostra (será algo assim):

```powershell
git remote add origin https://github.com/SEU_USUARIO/carlshop.git
git branch -M main
```

Sem saída = sucesso ✅

### 4.6 - Fazer Push (Enviar para GitHub)

```powershell
git push -u origin main
```

A **PRIMEIRA VEZ** vai pedir seu login:
1. Digite seu **username do GitHub**
2. Pressione **Enter**
3. Digite sua **senha do GitHub**
4. Pressione **Enter**

> Nota: Se receber erro "fatal: could not read Password", significa que precisa gerar um **token de acesso pessoal** em vez de usar senha.

#### Se pedir Token (GitHub 2023+)

1. Acesse: https://github.com/settings/tokens/new
2. **Select scopes**: Marque ✅ `repo` (acesso completo a repositórios privados)
3. Clique **Generate token**
4. **Copie o token** (aparece uma vez só!)
5. Volte ao PowerShell
6. Em vez de digitar senha, **cole o token**

Saída esperada:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Delta compression using up to X threads
Compressing objects: 100% (X/X), done.
Writing objects: 100% (X/X), X bytes | X bytes/s, done.
Total X (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/seu-usuario/carlshop.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

✅ **Sucesso! Código no GitHub!**

---

## 5️⃣ Verificar no GitHub Website

Acesse: https://github.com/SEU_USUARIO/carlshop

Você vai ver:
- Todos seus arquivos
- Commits
- Branches

---

## 6️⃣ Próximas Vezes (Commits Futuros)

Sempre que modificar código:

```powershell
cd "c:\Users\joaob\OneDrive\Desktop\GPO FRUTAS E ITENS"

git add .
git commit -m "Descreva o que mudou aqui"
git push
```

Exemplo:
```powershell
git add .
git commit -m "Atualizado cores do header"
git push
```

---

## 🆘 Erros Comuns

### ❌ "fatal: not a git repository"
**Solução**: Você não fez `git init`
```powershell
git init
git add .
git commit -m "Deploy v1.0"
```

### ❌ "fatal: 'origin' does not appear to be a 'git' repository"
**Solução**: Você não configurou o remote
```powershell
git remote add origin https://github.com/SEU_USUARIO/carlshop.git
git branch -M main
git push -u origin main
```

### ❌ "Permission denied (publickey)"
**Solução**: Gerar chave SSH
```powershell
ssh-keygen -t ed25519 -C "seu@email.com"
```
Depois adicionar em: https://github.com/settings/keys

### ❌ "Your branch is ahead of 'origin/main' by X commits"
**Solução**: Seu código local tem commits que não estão no GitHub
```powershell
git push
```

### ❌ Arquivo não sincroniza depois de modificar
**Solução**: Adicionar e fazer novo commit
```powershell
git add .
git commit -m "Descrição da mudança"
git push
```

---

## 📱 Integração com Vercel/Railway

Depois que seu código está no GitHub:

1. **Vercel** automaticamente detecta mudanças e redeploy
2. **Railway** automaticamente detecta mudanças e redeploy

Não precisa fazer mais nada! 🚀

---

## 🎓 Glossário Git

| Termo | Significado |
|-------|-----------|
| **Repository** | Pasta do projeto no GitHub |
| **Commit** | Salvar mudanças com mensagem |
| **Push** | Enviar commits para GitHub |
| **Pull** | Baixar commits do GitHub |
| **Remote** | Link para o repositório remoto (GitHub) |
| **Branch** | Versão alternativa do código (usamos `main`) |
| **Token** | Senha temporária para autenticar |

---

## ✅ Checklist Completo

- [ ] GitHub account criada
- [ ] Repositório `carlshop` criado
- [ ] Git instalado localmente
- [ ] `git config --global user.name` configurado
- [ ] `git config --global user.email` configurado
- [ ] `git init` executado
- [ ] Primeiro `git add .` e `git commit` feito
- [ ] `git remote add origin` configurado
- [ ] Primeiro `git push` enviado
- [ ] Código visible em https://github.com/seu-usuario/carlshop

---

## 🚀 Próximo Passo

Vá para: [DEPLOY_VERCEL_RAILWAY.md](DEPLOY_VERCEL_RAILWAY.md)

---

**Tudo certo? Agora vamos fazer o deploy! 🎉**
