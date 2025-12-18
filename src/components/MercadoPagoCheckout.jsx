import { useState, useEffect } from 'react'
import { X, Loader } from 'lucide-react'

export default function MercadoPagoCheckout({ isOpen, onClose, totalPrice, items }) {
  const [preferenceId, setPreferenceId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Nota: Você precisa ter uma chave pública do Mercado Pago
  // Substitua 'YOUR_PUBLIC_KEY' pela sua chave pública real
  const publicKey = 'APP_USR-YOUR_PUBLIC_KEY_HERE'

  useEffect(() => {
    if (isOpen && preferenceId) {
      // Inicializar o checkout do Mercado Pago
      const initMercadoPago = async () => {
        try {
          const script = document.createElement('script')
          script.src = 'https://sdk.mercadopago.com/js/v2'
          script.async = true
          document.body.appendChild(script)

          script.onload = () => {
            window.MercadoPago?.bricksBuilder?.create?.()
          }
        } catch (err) {
          console.error('Erro ao carregar Mercado Pago:', err)
        }
      }
      initMercadoPago()
    }
  }, [isOpen, preferenceId])

  const handleCreatePreference = async () => {
    setLoading(true)
    setError(null)

    try {
      // Você precisa ter um backend que cria a preferência no Mercado Pago
      // Este é um exemplo de como deveria funcionar
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'BRL'
          })),
          external_reference: `order-${Date.now()}`,
          notification_url: `${window.location.origin}/webhook/mercadopago`
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento')
      }

      const data = await response.json()
      setPreferenceId(data.id)

      // Redirecionar para Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point
      }
    } catch (err) {
      console.error('Erro:', err)
      setError(err.message || 'Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Mercado Pago
            </h2>
            <p className="text-orange-500 mt-1 text-lg font-bold">
              R$ {totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 font-semibold">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">💳 Pagamento Seguro</h3>
              <p className="text-gray-300 text-sm mb-3">
                Você será redirecionado para o Mercado Pago para completar seu pagamento de forma segura.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✓ Cartão de crédito</li>
                <li>✓ Cartão de débito</li>
                <li>✓ Pix</li>
                <li>✓ Boleto</li>
              </ul>
            </div>

            {/* Items Summary */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3">Resumo do Pedido</h4>
              <div className="space-y-2 text-sm mb-3 max-h-40 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-gray-300">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="text-orange-400">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                <span className="text-white">Total:</span>
                <span className="text-orange-500 text-lg">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handleCreatePreference}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-600 text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Processando...
                </>
              ) : (
                'Ir para Mercado Pago'
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center">
              Você será redirecionado para o Mercado Pago. Nenhum dado de cartão é armazenado em nossos servidores.
            </p>
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
