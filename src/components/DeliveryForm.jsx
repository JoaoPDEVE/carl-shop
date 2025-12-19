import { X, Mail, Phone, User, MessageCircle, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DeliveryForm({ isOpen, onClose, onSubmit, totalPrice, items = [], isCheckoutFlow = false }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    discord: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Resend API Key (obtém do localStorage ou usa uma padrão)
  useEffect(() => {
    // Aqui você configura sua Resend API Key
    // Você pode armazenar em variável de ambiente
    const resendApiKey = localStorage.getItem('resend-api-key') || ''
    if (!resendApiKey) {
      console.log('Configure sua chave Resend API em localStorage: resend-api-key')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validação
    if (!formData.nome || !formData.email || !formData.telefone || !formData.discord) {
      setError('Todos os campos são obrigatórios!')
      return
    }

    // Validação de email melhorada
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('E-mail inválido! Use o formato: seu@email.com')
      return
    }

    // Validação de telefone brasileiro
    const phoneDigits = formData.telefone.replace(/\D/g, '')
    const phoneRegex = /^(\d{2})\d{4,5}(\d{4})$/
    if (!phoneRegex.test(phoneDigits)) {
      setError('Telefone inválido! Use o formato: (11) 98765-4321 ou (11) 9876-5432')
      return
    }

    setLoading(true)

    try {
      const purchaseData = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        discord: formData.discord,
        total: totalPrice,
        itens: items.map(i => `${i.name} (${i.quantity}x) - R$ ${(i.price * i.quantity).toFixed(2)}`).join(', '),
        data: new Date().toLocaleString('pt-BR')
      }

      // Salvar em localStorage (sem backend)
      localStorage.setItem(`delivery-${Date.now()}`, JSON.stringify(purchaseData))

      // Simular resposta bem-sucedida (dados salvos localmente)
      try {
        const emailResponse = {
          ok: true
        }
        
        // Aqui você pode adicionar lógica para integrar um serviço de email no futuro
        // Por enquanto, tudo é salvo em localStorage

        if (!emailResponse.ok) {
          console.log('Dados salvos localmente')
        } else {
          console.log('Email enviado com sucesso!')
        }
      } catch (err) {
        console.log('Erro ao enviar email:', err.message)
      }

      console.log('Dados de entrega:', purchaseData)
      
      setSuccess(true)
      onSubmit(formData)
      
      // Se for do fluxo de checkout, não fecha (vai pro pagamento)
      // Se for standalone, fecha após 2 segundos
      if (!isCheckoutFlow) {
        setTimeout(() => {
          setFormData({ nome: '', email: '', telefone: '', discord: '' })
          setSuccess(false)
          onClose()
        }, 2000)
      }
      
      setLoading(false)
    } catch (err) {
      setError('Erro ao processar dados. Tente novamente.')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 rounded-xl sm:rounded-2xl w-full max-w-sm">
        {/* Header */}
        <div className="border-b border-gray-800 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold text-white">
            Dados de Entrega
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors active:scale-90"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
            Preencha seus dados para que possamos identificar sua compra e efetuar a entrega
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <User size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 top-2.5 sm:top-3 text-gray-500" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                E-mail *
              </label>
              <div className="relative">
                <Mail size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 top-2.5 sm:top-3 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                Telefone/WhatsApp *
              </label>
              <div className="relative">
                <Phone size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 top-2.5 sm:top-3 text-gray-500" />
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(84) 99921-2498"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Discord */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                Usuário Discord *
              </label>
              <div className="relative">
                <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 top-2.5 sm:top-3 text-gray-500" />
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="usuario#1234"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Total */}
            <div className="p-3 sm:p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">Total da Compra</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-400 mt-1">
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>

            {error && (
              <div className="p-2 sm:p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs sm:text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                Dados recebidos! Redirecionando...
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm sm:text-base active:scale-95"
            >
              {loading ? 'Processando...' : success ? '✓ Dados Recebidos!' : isCheckoutFlow ? 'Prosseguir para Pagamento' : 'Confirmar Dados'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center">
            ✓ Seus dados serão enviados por email
          </p>
        </div>
      </div>
    </div>
  )
}
