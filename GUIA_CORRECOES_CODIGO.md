# 🔧 GUIA DE CORREÇÕES - CÓDIGO ESPECÍFICO

## TOP 6 CORREÇÕES PARA HOJE

### 🔴 #1: EMAIL ENVIADO PARA EMAIL FIXO
**Arquivo**: `src/components/Checkout.jsx`  
**Linha**: 53  

**ANTES**:
```javascript
to: 'joaobjjpedro@gmail.com'
```

**DEPOIS**:
```javascript
to: data.email  // Email do cliente!
```

**Também corrigir em**: `src/components/DeliveryForm.jsx:62`

---

### 🔴 #4: CARRINHO NÃO LIMPA APÓS COMPRA
**Arquivo**: `src/components/Checkout.jsx`  
**Linha**: 89  

**ANTES**:
```javascript
const handlePaymentClick = (paymentMethod) => {
  recordPurchase(paymentMethod, deliveryData)
  
  // Redirecionar conforme método de pagamento escolhido
  if (paymentMethod === 'GGMAX') {
    window.open('https://...', '_blank')
  }
  // ... mais código
  onClose()
}
```

**DEPOIS** (adicionar `setCart([])` logo após `recordPurchase`):
```javascript
const handlePaymentClick = (paymentMethod) => {
  recordPurchase(paymentMethod, deliveryData)
  setCart([])  // ← ADICIONAR ISSO!
  
  // Redirecionar conforme método de pagamento escolhido
  if (paymentMethod === 'GGMAX') {
    window.open('https://...', '_blank')
  }
  // ... mais código
  onClose()
}
```

**Mas cuidado**: `setCart` não é prop! Você precisa receber como prop:
```javascript
export default function Checkout({ isOpen, onClose, totalPrice, items = [], user, setCart })
```

E no App.jsx passar:
```javascript
<Checkout 
  isOpen={showCheckout}
  onClose={() => setShowCheckout(false)}
  totalPrice={totalPrice}
  items={cart}
  user={user}
  setCart={setCart}  // ← ADICIONAR
/>
```

---

### 🔴 #7: BOTÃO FINALIZAR COM CARRINHO VAZIO
**Arquivo**: `src/components/Cart.jsx`  
**Linha**: 55  

**ANTES**:
```javascript
<button className="btn-primary w-full mb-3" onClick={onCheckout}>
  Finalizar Compra
</button>
```

**DEPOIS**:
```javascript
<button 
  className="btn-primary w-full mb-3" 
  onClick={onCheckout}
  disabled={items.length === 0}
  style={items.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
>
  Finalizar Compra
</button>
```

---

### 🟠 #6: CONTACT FORM NÃO FUNCIONA
**Arquivo**: `src/components/Contact.jsx`  
**Linha**: 60-120  

**ANTES**:
```jsx
import ... // sem FormEvent, useState

export default function Contact() {
  return (
    // ...
    <form className="space-y-4">
      <input type="text" placeholder="Seu nome" />
      <input type="email" placeholder="seu@email.com" />
      <input type="text" placeholder="Qual é o assunto?" />
      <textarea placeholder="Mensagem..." />
      <button type="submit" className="btn-primary w-full">Enviar</button>
    </form>
  )
}
```

**DEPOIS**:
```jsx
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      setMessage('Todos os campos são obrigatórios')
      return
    }

    setLoading(true)
    
    try {
      // Enviar para backend
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'joaobjjpedro@gmail.com',
          subject: `📞 Contato: ${formData.assunto}`,
          html: `
            <h2>${formData.assunto}</h2>
            <p><strong>De:</strong> ${formData.nome} (${formData.email})</p>
            <p><strong>Mensagem:</strong></p>
            <p>${formData.mensagem}</p>
          `
        })
      })

      if (response.ok) {
        setMessage('✅ Mensagem enviada com sucesso!')
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
      } else {
        setMessage('❌ Erro ao enviar mensagem')
      }
    } catch (err) {
      setMessage('❌ Erro na conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container-custom">
        {/* ... existing code ... */}
        
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Envie uma Mensagem</h3>
          
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {message}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Seu Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Seu Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Assunto</label>
              <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                placeholder="Qual é o assunto?"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Mensagem</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Sua mensagem aqui..."
                rows="5"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
```

---

### 🟠 #10: DASHBOARD COM PEDIDOS REAIS
**Arquivo**: `src/components/Dashboard.jsx`  
**Linha**: 24-45  

**ANTES**:
```javascript
const mockOrders = [
  {
    id: '001',
    date: '2024-01-15',
    items: 'Goro Goro (x1), Mera Mera (x2)',
    total: 32,
    status: 'Entregue'
  },
  // ... dados fixos
]
```

**DEPOIS**:
```javascript
// Usar dados reais do localStorage
const realOrders = useMemo(() => {
  if (!user) return []
  const purchases = JSON.parse(localStorage.getItem(`purchases-${user.id}`) || '[]')
  return purchases.map(purchase => ({
    id: purchase.id,
    date: new Date(purchase.date).toLocaleDateString('pt-BR'),
    items: purchase.items.map(i => `${i.name} (${i.quantity}x)`).join(', '),
    total: purchase.total,
    paymentMethod: purchase.paymentMethod,
    status: 'Entregue'  // ou adicionar status real
  }))
}, [user])

// Usar realOrders em vez de mockOrders
```

---

### 🟠 #9: ADICIONAR LOADING STATE
**Arquivo**: `src/components/DeliveryForm.jsx`  
**Linha**: 10-15  

**ANTES**:
```javascript
export default function DeliveryForm({ isOpen, onClose, onSubmit, totalPrice, items = [], isCheckoutFlow = false }) {
  const [formData, setFormData] = useState({ ... })
  const [loading, setLoading] = useState(false)  // ← JÁ EXISTE
  const [error, setError] = useState('')
```

**Usar loading state no botão**:
```javascript
<button 
  type="submit"
  disabled={loading}  // ← ADICIONAR
  className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  // ← ADICIONAR
  onClick={handleSubmit}
>
  {loading ? '⏳ Processando...' : '✓ Confirmar'}  {/* ← ADICIONAR */}
</button>
```

---

### 🟠 #13: VALIDAÇÃO DE TELEFONE MELHOR
**Arquivo**: `src/components/DeliveryForm.jsx`  
**Linha**: 34-45 (handleSubmit)  

**ANTES**:
```javascript
if (!formData.email.includes('@')) {
  setError('E-mail inválido!')
  return
}
```

**DEPOIS**:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(formData.email)) {
  setError('E-mail inválido! Use formato: usuario@email.com')
  return
}

const phoneRegex = /^(\d{2})\d{4,5}(\d{4})$/
const phoneDigits = formData.telefone.replace(/\D/g, '')
if (!phoneRegex.test(phoneDigits) || phoneDigits.length < 10) {
  setError('Telefone inválido! Use formato: (XX) 9XXXX-XXXX')
  return
}
```

---

## 📊 CHECKLIST DE IMPLEMENTAÇÃO

```
HOJE (30 min):
- [ ] #1: Email para cliente (5 min)
- [ ] #4: Limpar carrinho (5 min)
- [ ] #7: Validar carrinho vazio (5 min)
- [ ] Testar tudo (15 min)

DEPOIS (2h):
- [ ] #6: Contact form (40 min)
- [ ] #9: Loading state (10 min)
- [ ] #10: Dashboard real (30 min)
- [ ] #13: Validação (20 min)
- [ ] Testar tudo (20 min)
```

---

## 🧪 TESTE APÓS CADA CORREÇÃO

Após aplicar cada mudança:

1. **#1 - Email do cliente**
   ```
   Teste: Faça compra → Procure email em INBOX do cliente
   ```

2. **#4 - Limpar carrinho**
   ```
   Teste: Compre item → Vá para Home → Carrinho deve estar vazio
   ```

3. **#7 - Botão com carrinho vazio**
   ```
   Teste: Clique em "Finalizar Compra" com carrinho vazio
   Esperado: Botão cinzento, não deixa clicar
   ```

4. **#6 - Contact form**
   ```
   Teste: Preencha formulário → Clique Enviar
   Esperado: Email chega em joaobjjpedro@gmail.com
   ```

5. **#9 - Loading state**
   ```
   Teste: Clique múltiplas vezes em "Enviar"
   Esperado: Botão desabilita na primeira clique
   ```

6. **#10 - Dashboard real**
   ```
   Teste: Faça compra → Vá ao Dashboard
   Esperado: Mostra compra recente (não fake)
   ```

