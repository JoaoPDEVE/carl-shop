import { X } from 'lucide-react'
import { useState } from 'react'
import DeliveryForm from './DeliveryForm'

export default function Checkout({ isOpen, onClose, totalPrice, items = [], user, setCart }) {
  const [step, setStep] = useState('delivery') // 'delivery' ou 'payment'
  const [deliveryData, setDeliveryData] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  // Salvar compra quando usuário finaliza
  const recordPurchase = (method, deliveryInfo) => {
    if (user) {
      const purchases = JSON.parse(localStorage.getItem(`purchases-${user.id}`) || '[]')
      const newPurchase = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: items.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: totalPrice,
        paymentMethod: method,
        delivery: deliveryInfo
      }
      purchases.push(newPurchase)
      localStorage.setItem(`purchases-${user.id}`, JSON.stringify(purchases))
    }
  }

  const handleDeliverySubmit = async (data) => {
    // Preparar dados da compra para email
    const purchaseData = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      discord: data.discord,
      total: totalPrice,
      itens: items.map(i => `${i.name} (${i.quantity}x) - R$ ${(i.price * i.quantity).toFixed(2)}`).join(', '),
      data: new Date().toLocaleString('pt-BR')
    }

    console.log('📧 Preparando email para:', data.email)
    console.log('📦 Dados:', purchaseData)
    
    // Enviar email via servidor backend
    console.log('📤 Tentando enviar via servidor backend...')
    try {
      const emailResponse = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: data.email,
          subject: `🛒 Compra Confirmada - ${data.nome}`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #FF6B35;">✅ COMPRA CONFIRMADA!</h2><hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;"><div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;"><h3 style="margin-top: 0;">Dados do Cliente:</h3><p><strong>👤 Nome:</strong> ${data.nome}</p><p><strong>📧 Email:</strong> ${data.email}</p><p><strong>📱 Telefone:</strong> ${data.telefone}</p><p><strong>🎮 Discord:</strong> ${data.discord}</p></div><div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #FF6B35;"><h3 style="margin-top: 0;">Detalhes da Compra:</h3><p><strong>📦 Itens:</strong> ${purchaseData.itens}</p><p><strong>💰 Total:</strong> R$ ${totalPrice.toFixed(2)}</p><p><strong>📅 Data:</strong> ${purchaseData.data}</p></div><hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;"><p style="color: #666; font-size: 12px; text-align: center;">Obrigado pela sua compra na CARLSHOP!</p></div>`
        })
      })

      if (!emailResponse.ok) {
        console.error('⚠️ Erro ao enviar email:', emailResponse.status)
        setMessage({ type: 'warning', text: '⚠️ Aviso: Email pode não ter sido enviado. Prossiga com cautela.' })
      } else {
        console.log('✅ Email enviado com sucesso!')
        setMessage({ type: 'success', text: '✅ Email enviado com sucesso para ' + data.email + '!' })
      }
    } catch (err) {
      console.error('⚠️ Erro na requisição:', err.message)
      setMessage({ type: 'error', text: '⚠️ Erro ao enviar email: ' + err.message })
    }
    setStep('payment')
  }

  const handlePaymentClick = (paymentMethod) => {
    setIsProcessing(true)
    recordPurchase(paymentMethod, deliveryData)
    setCart([])  // ← Limpar carrinho após compra

    // Redirecionar conforme método de pagamento escolhido
    if (paymentMethod === 'GGMAX') {
      window.open('https://www.ggmax.com.br/anuncio/carl-shop-frutas-e-itens-entrega-rapida-e-segura-promocao-de-itens', '_blank')
    } else if (paymentMethod === 'Discord') {
      window.open('https://discord.gg/trN8YvKuHC', '_blank')
    } else if (paymentMethod === 'Mercado Pago') {
      // Criar descrição formatada dos itens
      const itemsDescription = items
        .map(i => `${i.name} (${i.quantity}x) - R$ ${(i.price * i.quantity).toFixed(2)}`)
        .join(' | ')
      
      // Formatar valor (Mercado Pago espera sem ponto ou com ponto)
      const formattedTotal = totalPrice.toFixed(2)
      
      console.log('💳 Redirecionando para Mercado Pago')
      console.log('📋 Itens:', itemsDescription)
      console.log('💰 Total:', formattedTotal)
      
      window.open(`https://link.mercadopago.com.br/carlshoproblox?items=${encodeURIComponent(itemsDescription)}&total=${formattedTotal}`, '_blank')
    }

    setTimeout(() => {
      onClose()
      setIsProcessing(false)
    }, 500)
  }

  // Se estamos na etapa de entrega, mostra o formulário
  if (step === 'delivery') {
    return (
      <DeliveryForm 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDeliverySubmit}
        totalPrice={totalPrice}
        items={items}
        isCheckoutFlow={true}
      />
    )
  }

  // Se estamos na etapa de pagamento, mostra os métodos
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Mensagem de Feedback */}
        {message.text && (
          <div className={`sticky top-0 p-4 border-b z-50 ${
            message.type === 'success' 
              ? 'bg-green-500/20 border-green-500/50 text-green-300' 
              : message.type === 'warning'
              ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
              : 'bg-red-500/20 border-red-500/50 text-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <span>{message.text}</span>
              <button
                onClick={() => setMessage({ type: '', text: '' })}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Escolha o Pagamento
            </h2>
            <p className="text-orange-500 mt-1 text-xl font-bold">
              Total: R$ {totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => {
              setStep('delivery')
              setDeliveryData(null)
            }}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* GGMAX */}
            <button
              onClick={() => handlePaymentClick('GGMAX')}
              disabled={isProcessing}
              className="w-full text-left p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-orange-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">💳 GGMAX</h4>
                  <p className="text-gray-300">
                    Compre através da plataforma GGMAX com segurança
                  </p>
                </div>
                <div className="text-4xl">{isProcessing ? '⏳' : '→'}</div>
              </div>
            </button>

            {/* Discord */}
            <button
              onClick={() => handlePaymentClick('Discord')}
              disabled={isProcessing}
              className="w-full text-left p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">🎮 Discord</h4>
                  <p className="text-gray-300">
                    Entre em nosso servidor Discord e negocie diretamente
                  </p>
                </div>
                <div className="text-4xl">{isProcessing ? '⏳' : '→'}</div>
              </div>
            </button>

            {/* Mercado Pago */}
            <button
              onClick={() => handlePaymentClick('Mercado Pago')}
              disabled={isProcessing}
              className="w-full text-left p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl hover:from-blue-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">💰 Mercado Pago</h4>
                  <p className="text-gray-300">
                    Pague com cartão, Pix, boleto ou débito
                  </p>
                </div>
                <div className="text-4xl">{isProcessing ? '⏳' : '→'}</div>
              </div>
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-gray-300">
              ℹ️ <span className="font-semibold">Informação:</span> Escolha a forma de pagamento e você será redirecionado para finalizar.
            </p>
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setStep('delivery')
                setDeliveryData(null)
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Voltar para Dados de Entrega
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
