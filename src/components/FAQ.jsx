import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Quais são as formas de pagamento disponíveis?',
      answer: 'Aceitamos três formas de pagamento: DISCORD (negociação direta), GGMAX (plataforma segura) e MERCADO PAGO (cartão, Pix, boleto e débito). Escolha a mais conveniente para você!'
    },
    {
      question: 'Como posso entrar em contato com o suporte?',
      answer: 'Você pode nos contatar de duas maneiras: via DISCORD (carljohnsson) para conversa rápida ou via WHATSAPP (84 99921-2498) para dúvidas específicas. Responderemos o mais breve possível!'
    },
    {
      question: 'Vocês aceitam encomendas de itens específicos?',
      answer: 'Sim! Aceitamos encomendas e solicitações especiais. Se você procura por um item que não vê no catálogo, entre em contato conosco via DISCORD ou WHATSAPP e faremos o possível para atender sua solicitação.'
    },
    {
      question: 'Qual é o tempo de entrega após a compra?',
      answer: 'O tempo de entrega varia de acordo com a forma de pagamento escolhida. Após confirmar o pagamento, você receberá os itens no jogo em até 24 horas. Para encomendas especiais, faremos uma estimativa ao receber sua solicitação.'
    },
    {
      question: 'Os itens são seguros e legítimos?',
      answer: 'Sim! Todos os nossos itens são legítimos e seguros. Temos reputação estabelecida na comunidade GRAND PIECE ONLINE. Clientes satisfeitos confirmam a qualidade e a entrega pontual de nossos produtos.'
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-800/50 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
            Dúvidas <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Frequentes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tudo que você precisa saber sobre nossas compras e serviços
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-900 hover:bg-gray-800 transition-colors text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-orange-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ainda tem dúvidas?
          </h3>
          <p className="text-gray-300 mb-6">
            Entre em contato conosco! Nossa equipe está pronta para ajudar você.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/trN8YvKuHC"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <span>🎮</span> Discord: carljohnsson
            </a>
            <a
              href="https://wa.me/5584999212498"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <span>💬</span> WhatsApp: (84) 99921-2498
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
