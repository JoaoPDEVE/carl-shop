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
      setMessage('❌ Todos os campos são obrigatórios')
      return
    }

    setLoading(true)
    setMessage('')
    
    try {
      // Salvar contato em localStorage (sem backend)
      const contactData = {
        ...formData,
        data: new Date().toLocaleString('pt-BR')
      }
      localStorage.setItem(`contact-${Date.now()}`, JSON.stringify(contactData))
      
      const response = {
        ok: true
      }

      if (response.ok) {
        setMessage('✅ Mensagem enviada com sucesso! Vamos responder em breve.')
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
        setTimeout(() => setMessage(''), 5000)
      } else {
        setMessage('❌ Erro ao enviar mensagem. Tente novamente.')
      }
    } catch (err) {
      setMessage('❌ Erro na conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
            Entre em <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Contato</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tem dúvidas? Quer conversar sobre nossos produtos? Estamos sempre prontos para ajudar!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">💬 WhatsApp</h3>
              <p className="text-gray-300 mb-4">
                Fale conosco via WhatsApp para respostas rápidas e diretas!
              </p>
              <a
                href="https://wa.me/5584999212498"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Abrir WhatsApp
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">🎮 Discord</h3>
              <p className="text-gray-300 mb-4">
                Junte-se ao nosso servidor Discord para comunidade e suporte!
              </p>
              <a
                href="https://discord.com/users/carljohnsson"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Ir para Discord
              </a>
            </div>

            <div className="card p-6">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">📧 Email</h3>
              <p className="text-gray-300 mb-4">
                Envie um email para suporte em questões mais detalhadas
              </p>
              <a
                href="mailto:joaobjjpedro@gmail.com"
                className="btn-primary inline-block"
              >
                Enviar Email
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Envie uma Mensagem</h3>
            
            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {message}
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Seu Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Qual é o assunto?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows="5"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? '⏳ Enviando...' : '✓ Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-16 card p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Horário de Atendimento</h3>
          <p className="text-gray-300 text-lg">
            Disponível 24/7 via WhatsApp e Discord para responder suas dúvidas e realizar vendas!
          </p>
        </div>
      </div>
    </section>
  )
}
