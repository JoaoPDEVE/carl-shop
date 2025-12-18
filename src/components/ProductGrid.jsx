import ProductCard from './ProductCard'
import GameCard from './GameCard'

export default function ProductGrid({ products, onAddToCart, filter, onFilterChange, onOpenCatalog, darkMode, games, gameProducts, onSelectGame }) {
  return (
    <section id="products" className="py-12 md:py-20 lg:py-32 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 relative z-10">
            Nosso <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Catálogo de Jogos</span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Escolha um jogo para ver todos os produtos disponíveis
          </p>
        </div>

        {/* Games Grid */}
        {games && games.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  productCount={gameProducts(game.id).length}
                  onSelectGame={onSelectGame}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 md:py-20">
            <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhum jogo disponível no momento. Por favor, volte mais tarde!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
