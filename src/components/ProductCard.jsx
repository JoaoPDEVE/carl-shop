import { Star, ShoppingCart, ExternalLink } from 'lucide-react'

export default function ProductCard({ product, onAddToCart, onOpenCatalog, darkMode }) {
  const handleClick = () => {
    if (product.isCatalog) {
      onOpenCatalog()
    } else {
      onAddToCart(product)
    }
  }

  return (
    <div className={`card group hover:-translate-y-2 cursor-pointer transition-all h-full flex flex-col ${ darkMode ? 'bg-gray-900' : 'bg-white' }`} onClick={handleClick}>
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : product.icon ? (
          <div className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
            {product.icon}
          </div>
        ) : (
          <div className="text-center">
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sem imagem</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        {/* Category */}
        <div className="inline-block px-2 sm:px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full mb-2 sm:mb-3 capitalize w-fit">
          {product.isCatalog ? 'Catálogo' : (product.category || 'Produto')}
        </div>

        {/* Title */}
        <h3 className={`text-base sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {product.description || 'Produto exclusivo'}
        </p>

        {/* Rating */}
        {!product.isCatalog && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price and Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-gray-700">
          {!product.isCatalog && (
            <span className="text-lg sm:text-xl font-bold text-orange-500">
              R$ {product.price?.toFixed(2) || '0.00'}
            </span>
          )}
          {product.isCatalog ? (
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              <ExternalLink size={16} className="hidden sm:block" />
              <span>Ver Catálogo</span>
            </button>
          ) : (
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              <ShoppingCart size={16} className="hidden sm:block" />
              <span>Adicionar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
