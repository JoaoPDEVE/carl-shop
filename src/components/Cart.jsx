import { Trash2, ArrowLeft } from 'lucide-react'

export default function Cart({ items, totalPrice, onRemove, onUpdateQuantity, onContinueShopping, onCheckout }) {
  return (
    <section className="py-8 sm:py-12 md:py-20 lg:py-32 min-h-screen overflow-hidden">
      <div className="container-custom">
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          Voltar às Compras
        </button>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">
          Seu <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Carrinho</span>
        </h2>

        {items.length === 0 ? (
          <div className="card p-6 sm:p-8 md:p-12 text-center">
            <div className="text-5xl sm:text-6xl mb-4">🛒</div>
            <p className="text-gray-400 text-base sm:text-lg mb-6">Seu carrinho está vazio</p>
            <button
              onClick={onContinueShopping}
              className="btn-primary"
            >
              Comece a Comprar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map(item => (
                <div key={item.id} className="card p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-start gap-3 sm:gap-6 flex-1 min-w-0">
                    <div className="text-4xl sm:text-5xl flex-shrink-0">{item.icon}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-1">{item.name}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{item.description}</p>
                      <p className="text-orange-500 font-bold text-sm sm:text-base">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-gray-800 px-3 sm:px-4 py-2 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-orange-500 hover:text-orange-400 font-bold text-base sm:text-lg active:scale-90 transition-transform min-h-10 min-w-10 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="min-w-6 sm:min-w-8 text-center font-bold text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-orange-500 hover:text-orange-400 font-bold text-base sm:text-lg active:scale-90 transition-transform min-h-10 min-w-10 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors active:scale-90 min-h-10 min-w-10 flex items-center justify-center"
                    >
                      <Trash2 size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="card p-5 sm:p-6 md:p-8 h-fit sticky top-20 sm:top-24">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-white">Resumo do Pedido</h3>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-800">
                <div className="flex justify-between text-gray-400 text-xs sm:text-sm md:text-base">
                  <span>Subtotal:</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs sm:text-sm md:text-base">
                  <span>Frete:</span>
                  <span className="text-green-400">Grátis</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4 sm:mb-6 text-base sm:text-lg md:text-xl font-bold">
                <span>Total:</span>
                <span style={{background: 'linear-gradient(to right, #f97316, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
              <button 
                className="btn-primary w-full mb-2 sm:mb-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base py-2 sm:py-3" 
                onClick={onCheckout}
                disabled={items.length === 0}
              >
                {items.length === 0 ? 'Carrinho Vazio' : 'Finalizar Compra'}
              </button>
              <button
                onClick={onContinueShopping}
                className="btn-secondary w-full text-xs sm:text-sm md:text-base py-2 sm:py-3"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
