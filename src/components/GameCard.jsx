import { ExternalLink } from 'lucide-react'

export default function GameCard({ game, productCount, onSelectGame, darkMode }) {
  return (
    <div 
      onClick={() => onSelectGame(game)}
      className={`card group hover:-translate-y-2 cursor-pointer transition-all h-full flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        {/* Badge */}
        <div className="inline-block px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full mb-2 sm:mb-3 w-fit">
          Jogo
        </div>

        {/* Title */}
        <h3 className={`text-base sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-purple-400 transition-colors line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {game.name}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm mb-3 line-clamp-2 flex-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {game.description || 'Coleção de itens'}
        </p>

        {/* Product Count */}
        <div className="mb-3 pb-3 border-b border-gray-700">
          <span className={`inline-block text-xs sm:text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
            📦 {productCount} {productCount === 1 ? 'produto' : 'produtos'}
          </span>
        </div>

        {/* Footer Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelectGame(game)
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <span>Ver Itens</span>
          <ExternalLink size={16} className="hidden sm:block" />
        </button>
      </div>
    </div>
  )
}
