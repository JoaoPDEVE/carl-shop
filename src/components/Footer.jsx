import { Mail, MessageSquare, ExternalLink } from 'lucide-react'

export default function Footer({ darkMode }) {
  return (
    <footer id="contact" className={`transition-all ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-gray-100'} border-t ${darkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}>
      <div className="container-custom py-12 md:py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🎮</span>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  CARLSHOP
                </h3>
                <p className="text-xs text-orange-500 font-semibold">Roblox Store</p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Sua loja oficial de itens Roblox com os melhores preços e atendimento de qualidade garantida.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://discord.com/users/carljohnsson" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-orange-600' : 'bg-gray-200 hover:bg-orange-500'}`}>
                <span className="text-lg">🎮</span>
              </a>
              <a href="https://wa.me/5584999212498" target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-green-600' : 'bg-gray-200 hover:bg-green-500'}`}>
                <span className="text-lg">💬</span>
              </a>
              <a href="mailto:joaobjjpedro@gmail.com" className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500'}`}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold text-lg mb-6 pb-2 border-b-2 ${darkMode ? 'text-white border-orange-500/50' : 'text-gray-900 border-orange-400'}`}>
              🔗 Links
            </h4>
            <ul className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <li>
                <a href="#home" className={`flex items-center gap-2 hover:gap-3 transition-all ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
                  <span className="text-lg">🏠</span> Início
                </a>
              </li>
              <li>
                <a href="#products" className={`flex items-center gap-2 hover:gap-3 transition-all ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
                  <span className="text-lg">📦</span> Produtos
                </a>
              </li>
              <li>
                <a href="#faq" className={`flex items-center gap-2 hover:gap-3 transition-all ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
                  <span className="text-lg">❓</span> FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className={`flex items-center gap-2 hover:gap-3 transition-all ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
                  <span className="text-lg">📧</span> Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-bold text-lg mb-6 pb-2 border-b-2 ${darkMode ? 'text-white border-orange-500/50' : 'text-gray-900 border-orange-400'}`}>
              ☎️ Contato
            </h4>
            <ul className={`space-y-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <MessageSquare size={18} className="flex-shrink-0 mt-0.5 text-green-500" />
                <div>
                  <p className="font-semibold text-white mb-1">WhatsApp</p>
                  <a href="https://wa.me/5584999212498" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 hover:text-green-400 transition-colors`}>
                    (84) 9 9921-2498 <ExternalLink size={14} />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="flex-shrink-0 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-semibold text-white mb-1">Email</p>
                  <a href="mailto:joaobjjpedro@gmail.com" className={`flex items-center gap-1 hover:text-blue-400 transition-colors break-all`}>
                    joaobjjpedro@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`font-bold text-lg mb-6 pb-2 border-b-2 ${darkMode ? 'text-white border-orange-500/50' : 'text-gray-900 border-orange-400'}`}>
              🛟 Suporte
            </h4>
            <ul className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <li>
                <a href="https://discord.com/users/carljohnsson" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${darkMode ? 'hover:bg-indigo-600/20 hover:text-indigo-400' : 'hover:bg-indigo-100 hover:text-indigo-600'}`}>
                  <span className="text-lg">🎮</span> Discord
                </a>
              </li>
              <li>
                <a href="#faq" className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${darkMode ? 'hover:bg-purple-600/20 hover:text-purple-400' : 'hover:bg-purple-100 hover:text-purple-600'}`}>
                  <span className="text-lg">💡</span> Dúvidas
                </a>
              </li>
              <li>
                <a href="#products" className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${darkMode ? 'hover:bg-pink-600/20 hover:text-pink-400' : 'hover:bg-pink-100 hover:text-pink-600'}`}>
                  <span className="text-lg">🎁</span> Promoções
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-orange-500/30 to-transparent' : 'bg-gradient-to-r from-transparent via-orange-400 to-transparent'} mb-8`}></div>

        {/* Bottom */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <p className="text-center sm:text-left">
            &copy; 2025 <span className="font-bold text-orange-500">CARLSHOP</span>. Todos os direitos reservados. | Desenvolvido com ❤️
          </p>
          <div className={`flex gap-4 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
            <a href="https://discord.com/users/carljohnsson" target="_blank" rel="noopener noreferrer" className={`font-semibold transition-colors ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
              Discord
            </a>
            <span className={darkMode ? 'text-gray-700' : 'text-gray-400'}>•</span>
            <a href="https://wa.me/5584999212498" target="_blank" rel="noopener noreferrer" className={`font-semibold transition-colors ${darkMode ? 'hover:text-orange-400' : 'hover:text-orange-600'}`}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
