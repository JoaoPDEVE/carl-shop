import { useState, useEffect } from 'react'
import { LogOut, Plus, Trash2, Edit2, BarChart3, ShoppingBag } from 'lucide-react'
import { saveGamesToFirebase, getGamesFromFirebase, saveProductsToFirebase, getProductsFromFirebase } from '../authClient'

export default function AdminPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [games, setGames] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [newGame, setNewGame] = useState({ name: '', description: '' })
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', gameId: '', description: '' })
  const [selectedGame, setSelectedGame] = useState('')

  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const loadedGames = await getGamesFromFirebase()
        const loadedProducts = await getProductsFromFirebase()
        setGames(loadedGames || [])
        setProducts(loadedProducts || [])
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Salvar games no localStorage e Firebase
  const saveGamesToStorage = (updatedGames) => {
    localStorage.setItem('admin-games', JSON.stringify(updatedGames))
    saveGamesToFirebase(updatedGames).catch(err => console.error('Erro ao salvar no Firebase:', err))
  }

  // Salvar products no localStorage e Firebase
  const saveProductsToStorage = (updatedProducts) => {
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts))
    saveProductsToFirebase(updatedProducts).catch(err => console.error('Erro ao salvar no Firebase:', err))
  }

  const handleAddGame = () => {
    if (!newGame.name) {
      alert('Nome do game é obrigatório!')
      return
    }

    const updated = [...games, { 
      id: Date.now().toString(), 
      name: newGame.name,
      description: newGame.description,
      createdAt: new Date().toLocaleString('pt-BR')
    }]
    setGames(updated)
    saveGamesToStorage(updated)
    setNewGame({ name: '', description: '' })
  }

  const handleDeleteGame = (id) => {
    if (confirm('Tem certeza que quer deletar este game? Todos os produtos associados serão mantidos.')) {
      const updated = games.filter(g => g.id !== id)
      setGames(updated)
      saveGamesToStorage(updated)
    }
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.gameId) {
      alert('Nome, preço e game são obrigatórios!')
      return
    }

    const updated = [...products, {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity) || 1,
      gameId: newProduct.gameId,
      description: newProduct.description,
      createdAt: new Date().toLocaleString('pt-BR')
    }]
    setProducts(updated)
    saveProductsToStorage(updated)
    setNewProduct({ name: '', price: '', quantity: '', gameId: '', description: '' })
  }

  const handleDeleteProduct = (id) => {
    if (confirm('Tem certeza que quer deletar este produto?')) {
      const updated = products.filter(p => p.id !== id)
      setProducts(updated)
      saveProductsToStorage(updated)
    }
  }

  // Estatísticas
  const totalProducts = products.length
  const totalGames = games.length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)

  const getGameName = (gameId) => games.find(g => g.id === gameId)?.name || 'Game não encontrado'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">🎮 Painel Administrativo</h1>
            <p className="text-gray-400 mt-2">Bem-vindo, {user?.name || 'Admin'}!</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            <LogOut size={20} />
            Sair do Admin
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition ${
              activeTab === 'dashboard'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition ${
              activeTab === 'games'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={20} />
            Games ({totalGames})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition ${
              activeTab === 'products'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={20} />
            Produtos ({totalProducts})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Carregando dados do Firebase...</p>
          </div>
        ) : (
          <>
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Estatísticas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Cards de stats */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
                    <p className="text-blue-200 font-semibold mb-2">Total de Games</p>
                    <p className="text-4xl font-bold">{totalGames}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
                    <p className="text-green-200 font-semibold mb-2">Total de Produtos</p>
                    <p className="text-4xl font-bold">{totalProducts}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-lg">
                    <p className="text-orange-200 font-semibold mb-2">Valor em Estoque</p>
                    <p className="text-4xl font-bold">R$ {totalValue.toFixed(2)}</p>
                  </div>
                </div>

                {/* Produtos por Game */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Distribuição por Game</h3>
                  {games.length === 0 ? (
                    <p className="text-gray-400">Nenhum game cadastrado</p>
                  ) : (
                    <div className="space-y-2">
                      {games.map(game => {
                        const gameProducts = products.filter(p => p.gameId === game.id)
                        const gameValue = gameProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
                        return (
                          <div key={game.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{game.name}</p>
                              <p className="text-gray-400 text-sm">{gameProducts.length} produtos</p>
                            </div>
                            <p className="text-lg font-bold text-green-400">R$ {gameValue.toFixed(2)}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAMES TAB */}
            {activeTab === 'games' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Gerenciar Games</h2>
                
                {/* Adicionar novo game */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Adicionar Novo Game</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome do game"
                      value={newGame.name}
                      onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Descrição (opcional)"
                      value={newGame.description}
                      onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none resize-none h-20"
                    />
                    <button
                      onClick={handleAddGame}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      Adicionar Game
                    </button>
                  </div>
                </div>

                {/* Lista de games */}
                <div className="space-y-3">
                  {games.length === 0 ? (
                    <p className="text-gray-400">Nenhum game cadastrado</p>
                  ) : (
                    games.map(game => (
                      <div key={game.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-lg">{game.name}</p>
                          {game.description && <p className="text-gray-400 text-sm">{game.description}</p>}
                          <p className="text-gray-500 text-xs">{game.createdAt}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGame(game.id)}
                          className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
                
                {/* Adicionar novo produto */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Adicionar Novo Produto</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                    
                    <select
                      value={newProduct.gameId}
                      onChange={(e) => setNewProduct({ ...newProduct, gameId: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">Selecione um game</option>
                      {games.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Preço (R$)"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Quantidade"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        className="bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <textarea
                      placeholder="Descrição (opcional)"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:border-orange-500 focus:outline-none resize-none h-20"
                    />
                    
                    <button
                      onClick={handleAddProduct}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      Adicionar Produto
                    </button>
                  </div>
                </div>

                {/* Lista de produtos */}
                <div className="space-y-3">
                  {products.length === 0 ? (
                    <p className="text-gray-400">Nenhum produto cadastrado</p>
                  ) : (
                    products.map(product => (
                      <div key={product.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{product.name}</p>
                          <p className="text-gray-400 text-sm">Game: {getGameName(product.gameId)}</p>
                          {product.description && <p className="text-gray-400 text-sm mt-1">{product.description}</p>}
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-green-400 font-bold">R$ {product.price.toFixed(2)}</span>
                            <span className="text-blue-400">Qtd: {product.quantity}</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-2">{product.createdAt}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition flex-shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
