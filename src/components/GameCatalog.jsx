import { ChevronLeft, ShoppingCart } from 'lucide-react'
import ProductCard from './ProductCard'

export default function GameCatalog({ game, products, onBack, onAddToCart, darkMode }) {
  if (!game) return null

  return (
    <section className="py-20 md:py-32">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-12 flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          <ChevronLeft size={20} />
          Voltar aos Jogos
        </button>

        {/* Game Header */}
        <div className={`mb-12 rounded-xl border ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30' 
            : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
        } p-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Game Image */}
            <div className="flex-shrink-0">
              <img
                src={game.image}
                alt={game.name}
                className="w-32 h-32 object-contain rounded-lg bg-gray-800 p-4"
              />
            </div>

            {/* Game Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                {game.name}
              </h1>
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {game.description}
              </p>
              <div className={`text-sm font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {products.length} produto{products.length !== 1 ? 's' : ''} disponível{products.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold mb-8">
              Itens Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart size={64} className={`mx-auto mb-4 opacity-50 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhum produto disponível neste jogo no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
