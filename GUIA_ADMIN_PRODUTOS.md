# 📚 GUIA - Sistema de Gerenciamento de Produtos

## 🎯 Objetivo
Sistema completo para adicionar e gerenciar jogos e seus produtos através do painel admin, com upload de imagens diretamente do computador.

---

## 🚀 Como Usar

### 1️⃣ ACESSAR O ADMIN

1. Acesse a aplicação: `http://localhost:3000`
2. Clique em **"Admin"** no navbar
3. Faça login com suas credenciais
4. Você será redirecionado ao **Painel Administrativo**

---

### 2️⃣ CRIAR UM JOGO (ABA JOGOS)

#### Passo 1: Clique em "Novo Jogo"
- Botão laranja no topo da aba "Jogos"

#### Passo 2: Preencha os dados
- **Nome do Jogo**: Ex: "Roblox", "Minecraft", etc.
- **Descrição**: Detalhes sobre o jogo
- **Logo/Imagem**: Clique para enviar a imagem do jogo

#### Passo 3: Upload de Imagem
- Clique na área com **"Clique para enviar logo"**
- Selecione uma imagem do seu computador
- Você verá um **preview** da imagem
- Pode clicar no ✏️ para trocar de imagem
- Ou clique no 🗑️ para remover

#### Passo 4: Salvar
- Clique em **"Criar Jogo"** (verde)
- O jogo aparecerá na grid abaixo

#### ✏️ Editar Jogo
- Clique no botão **"Editar"** em qualquer card de jogo
- Modifique os dados
- Clique em **"Atualizar Jogo"**

#### 🗑️ Deletar Jogo
- Clique no botão **"Deletar"** em qualquer card
- **ATENÇÃO**: Todos os produtos deste jogo também serão deletados!

---

### 3️⃣ ADICIONAR PRODUTOS A UM JOGO (ABA PRODUTOS)

#### Passo 1: Selecione um Jogo
- Na área de seleção no topo, clique no jogo desejado
- O card do jogo será exibido com um ícone ✓

#### Passo 2: Clique em "Novo Produto"
- Botão laranja: **"Novo Produto"**

#### Passo 3: Preencha os Dados do Produto

**Lado Esquerdo:**
- **Nome do Produto** *(obrigatório)*
  - Ex: "Grand Taco Dorado", "Wings de Fogo", etc.

- **Preço (R$)** *(obrigatório)*
  - Formato: 99.99

- **Estoque**
  - Quantidade disponível
  - Padrão: 999

- **Raridade**
  - Clique em uma das opções: **Comum | Raro | Épico | Lendário**
  - A opção escolhida ficará em laranja

- **Descrição**
  - Descreva o produto (pode deixar em branco)
  - Exemplo: "Comida deliciosa que dobra sua energia"

**Lado Direito:**
- **Imagem do Produto** *(obrigatório)*
  - Clique na área para enviar imagem
  - Ou arraste uma imagem da pasta do seu PC
  - Tamanho recomendado: 400x400px ou quadrado

#### Passo 4: Upload de Imagem
- Selecione um arquivo de imagem do seu computador
- Você verá um **preview** da imagem
- Pode clicar no ✏️ para trocar
- Ou clique no 🗑️ para remover

#### Passo 5: Salvar Produto
- Clique em **"Criar Produto"** (verde)
- O produto aparecerá na grid de produtos do jogo

---

## 📋 GRID DE PRODUTOS

Cada produto é exibido em um **card visual** com:

```
┌─────────────────────────┐
│   [Imagem do Produto]   │
├─────────────────────────┤
│ Nome do Produto         │
│ R$ 99.99  [Raridade]    │
│ Descrição curta...      │
│ 📦 Estoque: 50          │
│                         │
│ [Editar] [Deletar]      │
└─────────────────────────┘
```

### Botões:
- **✏️ Editar**: Modifica o produto (preenche o formulário novamente)
- **🗑️ Deletar**: Remove o produto (com confirmação)

---

## 📊 DASHBOARD (Stats)

No topo do admin, você verá 4 cards com estatísticas:

1. **Total de Jogos** 🎮
   - Quantidade total de jogos criados

2. **Total de Produtos** 📦
   - Quantidade total de produtos em todos os jogos

3. **Itens em Estoque** 📦
   - Soma de todos os estoques

4. **Preço Médio** 💰
   - Média de preços dos produtos

---

## 🎨 FUNCIONALIDADES EXTRAS

### Sticky Form (Formulário Flutuante)
- O formulário fica **fixo no topo** enquanto você rola a página
- Facilita preencher sem perder de vista os dados

### Preview de Imagem
- Veja como a imagem ficará **antes de salvar**
- Previne erros de upload

### Raridade com Seleção Rápida
- 4 botões pré-definidos: **Comum | Raro | Épico | Lendário**
- Clique no que desejar

### Ícones Visuais
- ➕ Novo
- ✏️ Editar
- 🗑️ Deletar
- ✓ Selecionado

---

## 💡 DICAS E BOAS PRÁTICAS

### Imagens
✅ **Recomendado**
- Formato: PNG, JPG, WEBP
- Tamanho: 400x400px ou quadrado
- Comprimidas (< 2MB)

❌ **Evitar**
- Imagens muito grandes (> 5MB)
- Formatos raros (TIFF, BMP)
- Imagens muito escuras ou sem qualidade

### Nomes
✅ **Bom**
- "Grand Taco Dorado"
- "Wings de Fogo Premium"
- "Poção de Inteligência"

❌ **Ruim**
- "produto 1"
- "item"
- "coisa"

### Preços
✅ **Bom**
- 10.00
- 99.90
- 1.50

❌ **Ruim**
- 10
- 99,90 (usar ponto, não vírgula)
- abc

---

## 🔒 DADOS ARMAZENADOS

- **Jogos**: Salvos em `localStorage` com chave `admin-games`
- **Produtos**: Salvos em `localStorage` com chave `admin-products`
- **Imagens**: Convertidas em Base64 e armazenadas

### Quando os dados são sincronizados?
✅ Depois de clicar **"Criar"** ou **"Atualizar"**  
✅ Depois de clicar **"Deletar"** (com confirmação)  
✅ Quando você sair e voltar ao painel

---

## ⚠️ ATENÇÃO

### Deletar Jogo
- Ao deletar um jogo, **TODOS os seus produtos também são deletados**
- Não há como recuperar (a menos que você faça backup manual)

### Formulário Sticky
- O formulário fica no topo da página
- Se tiver dúvida de algum campo, role a página para ver

### Upload de Imagem
- A imagem é convertida em texto (Base64)
- Não é armazenada em servidor, fica em `localStorage`
- Funciona offline após o primeiro upload

---

## 🎓 EXEMPLO COMPLETO

### Criar um Jogo "Roblox" com um Produto

1. **Aba JOGOS** → Clique em "Novo Jogo"
   ```
   Nome: Roblox
   Descrição: A plataforma criativa onde você constrói
   Imagem: (selecione logo-roblox.png)
   ```
   → Clique em "Criar Jogo"

2. **Aba PRODUTOS** → Selecione "Roblox"
   - Clique em "Novo Produto"
   ```
   Nome: Grand Taco Dorado
   Preço: 39.90
   Estoque: 150
   Raridade: Lendário (clique no botão)
   Descrição: Taco dourado que aumenta XP em 50%
   Imagem: (selecione grand-taco.png)
   ```
   → Clique em "Criar Produto"

3. ✅ Pronto! O produto aparecerá na grid

---

## 🐛 TROUBLESHOOTING

### "Imagem não aparece"
- Verifique se o arquivo é uma imagem válida
- Tente novamente com outro arquivo

### "Produto não salva"
- Verifique se **TODOS** os campos obrigatórios estão preenchidos:
  - ✅ Nome do Produto
  - ✅ Preço
  - ✅ Imagem

### "Perdi meus dados"
- Os dados estão em `localStorage` do navegador
- Se você limpou o cache, os dados foram perdidos
- Não há backup automático

### "Formulário desapareceu"
- Role a página para cima
- O formulário está fixo no topo

---

## 📞 SUPORTE

Se encontrar problemas:
1. Verifique este guia
2. Abra o Console (F12) para ver erros
3. Verifique se todos os campos obrigatórios estão preenchidos
4. Tente recarregar a página (F5)

---

**Última atualização**: 18 de dezembro de 2025
**Status**: ✅ Sistema Funcional e Completo
