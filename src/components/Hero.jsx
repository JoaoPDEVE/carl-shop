export default function Hero({ onNavigate, darkMode }) {
  return (
    <section id="home" className="relative py-12 md:py-20 lg:py-32">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 sm:w-96 md:w-[500px] h-72 sm:h-96 md:h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 md:w-[500px] h-72 sm:h-96 md:h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Os Melhores <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Itens</span> do Roblox
            </h2>
            <p className={`text-base sm:text-lg md:text-xl mb-6 md:mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bem-vindo à CARLSHOP! Explore nosso catálogo completo de itens exclusivos para Roblox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => onNavigate('products')}
                className="btn-primary"
              >
                Explorar Produtos
              </button>
              <button 
                onClick={() => onNavigate('faq')}
                className="btn-secondary"
              >
                Mais Informações
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center order-1 md:order-2 mb-6 md:mb-0">
            <div className="relative">
              <div className="text-7xl sm:text-8xl md:text-9xl animate-float relative z-10">🎮</div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-orange-500/20 to-red-600/20 blur-3xl rounded-full animate-pulse -z-10" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-16 border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">∞</div>
            <p className={`text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-400 mt-1 md:mt-2' : 'text-gray-600 mt-1 md:mt-2'}`}>Itens Disponíveis</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">24/7</div>
            <p className={`text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-400 mt-1 md:mt-2' : 'text-gray-600 mt-1 md:mt-2'}`}>Catálogo Atualizado</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">✓</div>
            <p className={`text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-400 mt-1 md:mt-2' : 'text-gray-600 mt-1 md:mt-2'}`}>100% Confiável</p>
          </div>
        </div>
      </div>
    </section>
  )
}
