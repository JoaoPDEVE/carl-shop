import { X, Search, Heart } from 'lucide-react'
import { useState, useMemo } from 'react'
import ProductRatings from './ProductRatings'

export default function Catalog({ isOpen, onClose, onAddToCart, user, darkMode }) {
  const [addedItem, setAddedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cartshop-favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Itens do catálogo - Combinando itens salvos + itens padrão
  const defaultItems = [
    // Devil Fruits
    { id: 'gpo-1', name: 'Gum Gum Fruit', icon: '🔴', rarity: 'Lendária', price: 50.00, description: 'A fruta mais procurada de Grand Piece Online' },
    { id: 'gpo-2', name: 'Magnet Fruit', icon: '🧲', rarity: 'Épica', price: 35.00, description: 'Controla magnetismo no jogo' },
    { id: 'gpo-3', name: 'Dark Dark Fruit', icon: '⚫', rarity: 'Épica', price: 40.00, description: 'Poder das trevas' },
    { id: 'gpo-4', name: 'Flame Flame Fruit', icon: '🔥', rarity: 'Épica', price: 35.00, description: 'Controlar fogo no jogo' },
    { id: 'gpo-5', name: 'Ice Ice Fruit', icon: '❄️', rarity: 'Épica', price: 35.00, description: 'Poder do gelo' },
    { id: 'gpo-6', name: 'String String Fruit', icon: '🧵', rarity: 'Rara', price: 25.00, description: 'Criar cordas de poder' },
    { id: 'gpo-7', name: 'Sand Sand Fruit', icon: '🏜️', rarity: 'Rara', price: 25.00, description: 'Controlar areia' },
    { id: 'gpo-8', name: 'Thunder Thunder Fruit', icon: '⚡', rarity: 'Épica', price: 38.00, description: 'Poder do trovão' },
    
    // Special Items
    { id: 'gpo-9', name: 'Haki Awakening Scroll', icon: '📜', rarity: 'Lendária', price: 75.00, description: 'Despertar seu Haki potencial' },
    { id: 'gpo-10', name: 'Supreme Sword', icon: '⚔️', rarity: 'Épica', price: 45.00, description: 'Espada suprema para combate' },
    { id: 'gpo-11', name: 'Pirate Flag', icon: '🏴', rarity: 'Rara', price: 15.00, description: 'Bandeira pirata customizada' },
    { id: 'gpo-12', name: 'Treasure Map', icon: '🗺️', rarity: 'Rara', price: 20.00, description: 'Mapa para tesouro escondido' },
    { id: 'gpo-13', name: 'Wanted Poster', icon: '📋', rarity: 'Comum', price: 5.00, description: 'Poster procurado do seu personagem' },
    { id: 'gpo-14', name: 'Royal Bounty', icon: '👑', rarity: 'Lendária', price: 100.00, description: 'Recompensa real máxima' },
    
    // Boats
    { id: 'gpo-15', name: 'Caravel', icon: '⛵', rarity: 'Comum', price: 10.00, description: 'Barco básico para exploração' },
    { id: 'gpo-16', name: 'Galleon', icon: '🚢', rarity: 'Rara', price: 30.00, description: 'Galera poderosa para aventuras' },
    { id: 'gpo-17', name: 'Legendary Cruise Ship', icon: '🛳️', rarity: 'Lendária', price: 150.00, description: 'O navio mais lendário do jogo' },
    { id: 'gpo-18', name: 'Speed Yacht', icon: '⚡🛥️', rarity: 'Épica', price: 55.00, description: 'Iate ultra rápido' },
    
    // Consumables
    { id: 'gpo-19', name: 'Healing Potion', icon: '💚', rarity: 'Comum', price: 2.00, description: 'Recupera saúde rapidamente' },
    { id: 'gpo-20', name: 'Stamina Boost', icon: '⚡💙', rarity: 'Rara', price: 8.00, description: 'Aumenta resistência temporariamente' },
    { id: 'gpo-21', name: 'Strength Elixir', icon: '💪', rarity: 'Épica', price: 25.00, description: 'Bônus de força por 1 hora' },
    { id: 'gpo-22', name: 'Speed Serum', icon: '🏃', rarity: 'Rara', price: 10.00, description: 'Aumenta velocidade de movimento' },
    { id: 'gpo-23', name: 'Defense Shield', icon: '🛡️', rarity: 'Épica', price: 22.00, description: 'Proteção contra dano' },
    { id: 'gpo-24', name: 'Resurrection Orb', icon: '🌟', rarity: 'Lendária', price: 80.00, description: 'Revive após derrota' }
  ]

  // Combinar itens padrão com itens do localStorage
  const catalogItems = useMemo(() => {
    const products = localStorage.getItem('cartshop-products')
    const savedItems = products ? JSON.parse(products) : []
    
    // Combinar: itens padrão + itens salvos (evitando duplicatas)
    const combined = [...defaultItems]
    const defaultIds = new Set(defaultItems.map(item => item.id))
    
    savedItems.forEach(item => {
      if (!defaultIds.has(item.id)) {
        combined.push(item)
      }
    })
    
    return combined
  }, [isOpen])

  const handleAddToCart = (item) => {
    const productItem = {
      ...item,
      category: 'GRAND PIECE ONLINE',
      description: `Item exclusivo de GRAND PIECE ONLINE`,
      rating: 5.0,
      reviews: 100
    }
    onAddToCart(productItem)
    setAddedItem(item.id)
    setTimeout(() => setAddedItem(null), 2000)
  }

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
      localStorage.setItem('cartshop-favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  // Filtrar e ordenar itens
  const filteredItems = useMemo(() => {
    let filtered = catalogItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity
      const matchesPrice = 
        priceRange === 'all' ||
        (priceRange === '0-10' && item.price < 10) ||
        (priceRange === '10-20' && item.price >= 10 && item.price < 20) ||
        (priceRange === '20-50' && item.price >= 20 && item.price < 50) ||
        (priceRange === '50+' && item.price >= 50)
      
      return matchesSearch && matchesRarity && matchesPrice
    })

    // Ordenação
    return filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [searchTerm, selectedRarity, priceRange, sortBy])

  const rarities = [...new Set(catalogItems.map(item => item.rarity))]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-colors ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 border-b p-6 flex justify-between items-center transition-colors ${
          darkMode 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-300'
        }`}>
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              GRAND PIECE ONLINE
            </h2>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Catálogo de Itens Disponíveis</p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={24} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {/* Items Grid */}
        <div className="p-6">
          {/* Filtros e Busca */}
          <div className="mb-6 space-y-4">
            {/* Barra de Busca */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Raridade */}
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="all">Todas as Raridades</option>
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity}>{rarity}</option>
                ))}
              </select>

              {/* Preço */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="all">Todos os Preços</option>
                <option value="0-10">R$ 0 - R$ 10</option>
                <option value="10-20">R$ 10 - R$ 20</option>
                <option value="20-50">R$ 20 - R$ 50</option>
                <option value="50+">R$ 50+</option>
              </select>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-low">Preço (Menor)</option>
                <option value="price-high">Preço (Maior)</option>
              </select>
            </div>

            {/* Resultados */}
            <div className="text-sm text-gray-400">
              {filteredItems.length} item(ns) encontrado(s)
            </div>
          </div>

          {catalogItems.length === 0 ? (
            <div className="mt-8 p-8 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
              <p className="text-gray-400 text-lg mb-2">📦 Nenhum produto disponível</p>
              <p className="text-gray-500 text-sm">Produtos adicionados via painel Admin aparecerão aqui.</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="mt-8 p-8 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
              <p className="text-gray-400 text-lg">🔍 Nenhum item encontrado</p>
              <p className="text-gray-500 text-sm">Tente ajustar os filtros de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors group border border-gray-700"
                >
                  {/* Image Container */}
                  <div className="relative h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-6xl">{item.icon}</div>
                    )}
                    {/* Botão Favorito */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white text-sm flex-1">{item.name}</h3>
                      <span className="text-xs font-bold px-2 py-1 bg-orange-500/30 text-orange-300 rounded ml-2 whitespace-nowrap">
                        {item.rarity}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-orange-500 font-bold text-lg mb-3">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                        addedItem === item.id
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      {addedItem === item.id ? '✓ Adicionado!' : 'Comprar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ratings Modal - Show when clicking on an item */}
          <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Última Avaliação</h3>
            <ProductRatings productId="catalog-general" darkMode={true} user={user} />
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Fechar Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
