# 📱 GUIA: Sistema de Jogos e Produtos

## 🎮 Como Funciona

O sistema foi completamente reformulado para permitir a venda de itens de **múltiplos jogos diferentes** de forma organizada.

### Estrutura:
```
Loja
├── Jogos (Game Cards)
│   ├── Jogo 1
│   │   ├── Produto 1
│   │   ├── Produto 2
│   │   └── Produto 3
│   ├── Jogo 2
│   │   ├── Produto A
│   │   └── Produto B
```

---

## 🎯 Como Usar o Painel Admin

### 1️⃣ Criar um Novo Jogo

1. Acesse **Painel Admin** (email: `joaobjjpedro@gmail.com`)
2. Vá para a aba **"Jogos"**
3. Clique em **"Novo Jogo"**
4. Preencha:
   - **Nome do Jogo**: Ex: "Grand Piece Online", "Blox Fruits", etc.
   - **Descrição**: Descrição breve do jogo
   - **Logo/Imagem**: Clique para upload da imagem do jogo
5. Clique em **"Criar"**

### 2️⃣ Adicionar Produtos a um Jogo

1. Vá para a aba **"Produtos"**
2. **Selecione um Jogo** na seção de seleção
3. Clique em **"Novo Produto"**
4. Preencha os dados:
   - **Nome do Produto**: Ex: "Gum Gum Fruit"
   - **Preço**: Valor em reais
   - **Raridade**: Ex: "Lendária", "Épica", "Rara", "Comum"
   - **Estoque**: Quantidade disponível
   - **Descrição**: Detalhes do produto
   - **Imagem**: Upload da imagem do produto
5. Clique em **"Criar"**

### 3️⃣ Editar ou Deletar

- **Editar**: Clique no ícone de edição (lápis)
- **Deletar**: Clique no ícone de lixo

---

## 👥 Para os Clientes

### Visualização de Produtos

1. Acesse **"Produtos"** no menu principal
2. Você verá **Cards dos Jogos**
3. Clique em um card para ver todos os **produtos daquele jogo**
4. Clique em **"Voltar aos Jogos"** para voltar

### Compra

1. Na tela de produtos do jogo, clique no produto desejado
2. Clique no **carrinho** para adicionar
3. Continue comprando ou vá ao **carrinho**
4. Finalize a compra

---

## 📊 Estatísticas

O painel mostra em tempo real:
- **Total de Jogos**: Quantos jogos estão cadastrados
- **Total de Produtos**: Quantos produtos no total
- **Itens em Estoque**: Quantidade total em estoque
- **Preço Médio**: Preço médio dos produtos

---

## 💡 Exemplos de Uso

### Exemplo 1: Loja com 2 Jogos

**Jogo 1: Grand Piece Online**
- Gum Gum Fruit - R$ 50.00
- Flame Fruit - R$ 35.00
- Haki Scroll - R$ 75.00

**Jogo 2: Blox Fruits**
- Human Human Fruit - R$ 40.00
- Bomb Bomb Fruit - R$ 30.00

Cada jogo terá seu próprio card na home de produtos, e ao clicar, mostra apenas os produtos daquele jogo.

---

## ⚙️ Dados Armazenados

Os dados são salvos em **localStorage**:
- `admin-games`: Lista de jogos criados
- `admin-products`: Lista de produtos com seus respectivos gameId

**Backup**: Todos os dados estão no navegador. Se necessário limpar, use as ferramentas do navegador (DevTools).

---

## 🚀 Próximos Passos Recomendados

1. ✅ Criar vários jogos na aba "Jogos"
2. ✅ Adicionar produtos em cada jogo
3. ✅ Testar o fluxo de compra
4. ✅ Personalizar descrições e imagens
5. ✅ Adicionar mais jogos conforme necessário

---

## 🔧 Troubleshooting

**P: Os dados desapareceram após fechar o navegador?**
R: Os dados estão em localStorage. Se foi limpo o cache, os dados são perdidos. Considere fazer backup.

**P: Posso mudar um produto de um jogo para outro?**
R: Atualmente, cada produto está vinculado a um jogo. Delete e recrie no jogo correto.

**P: Quantos produtos posso adicionar?**
R: Sem limite técnico! Adicione quantos forem necessários.

---

Pronto! Sistema de múltiplos jogos e produtos está funcionando! 🎉
