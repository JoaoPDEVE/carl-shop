import { Star, MessageCircle, Lock } from 'lucide-react'
import { useState } from 'react'

export default function ProductRatings({ productId, darkMode, user }) {
  const [ratings, setRatings] = useState(() => {
    const stored = localStorage.getItem(`ratings-${productId}`)
    return stored ? JSON.parse(stored) : []
  })

  const [showForm, setShowForm] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [userName, setUserName] = useState(
    user ? user.name : 'Anônimo'
  )

  // Verificar se o usuário fez compra deste produto
  const hasUserPurchasedProduct = () => {
    if (!user) return false
    
    const purchases = JSON.parse(localStorage.getItem(`purchases-${user.id}`) || '[]')
    return purchases.some(purchase =>
      purchase.items.some(item => item.id === productId)
    )
  }

  const handleSubmitRating = (e) => {
    e.preventDefault()
    if (userRating === 0) return

    const newRating = {
      id: Math.random().toString(36).substr(2, 9),
      name: userName,
      rating: userRating,
      comment: userComment,
      date: new Date().toLocaleDateString('pt-BR'),
      verified: true
    }

    const updatedRatings = [newRating, ...ratings]
    setRatings(updatedRatings)
    localStorage.setItem(`ratings-${productId}`, JSON.stringify(updatedRatings))

    setUserRating(0)
    setUserComment('')
    setShowForm(false)
  }

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
      : 0

  const bgClass = darkMode
    ? 'bg-gray-900 border-gray-800 text-white'
    : 'bg-white border-gray-200 text-gray-900'
  const hoverClass = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'

  return (
    <div
      className={`rounded-xl border p-6 ${bgClass} space-y-4`}
    >
      {/* Rating Summary */}
      <div className="flex items-start justify-between pb-4 border-b border-gray-700/30">
        <div>
          <h3 className="text-lg font-bold mb-2">Avaliações dos Clientes</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-lg">{averageRating}</span>
            <span className="text-gray-500 text-sm">({ratings.length} avaliações)</span>
          </div>
        </div>
      </div>

      {/* Add Rating Button */}
      {!showForm && hasUserPurchasedProduct() && (
        <button
          onClick={() => setShowForm(true)}
          className={`w-full py-2 border-2 border-dashed border-orange-500/30 rounded-lg text-orange-500 hover:bg-orange-500/5 transition-colors font-semibold`}
        >
          + Adicionar Avaliação
        </button>
      )}

      {/* Locked Message */}
      {!hasUserPurchasedProduct() && (
        <div className="flex items-center justify-center gap-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <Lock size={18} className="text-yellow-500" />
          <p className="text-gray-300 font-semibold">
            {!user 
              ? 'Faça login para avaliar este produto' 
              : 'Você precisa comprar este produto para avaliar'}
          </p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmitRating} className="bg-gray-800/30 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Sua Nota</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`${
                      star <= userRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Comentário (opcional)</label>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Compartilhe sua experiência..."
              className={`w-full px-3 py-2 rounded-lg ${
                darkMode
                  ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400'
              } resize-none focus:outline-none focus:border-orange-500`}
              rows="3"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
            >
              Enviar Avaliação
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`flex-1 py-2 border rounded-lg font-semibold transition-colors ${
                darkMode
                  ? 'border-gray-700 hover:bg-gray-800 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Ratings List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div
              key={rating.id}
              className={`p-3 rounded-lg border ${
                darkMode
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{rating.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${
                            i < rating.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{rating.date}</span>
                  </div>
                </div>
                {rating.verified && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    ✓ Verificado
                  </span>
                )}
              </div>
              {rating.comment && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {rating.comment}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>
          </div>
        )}
      </div>
    </div>
  )
}
