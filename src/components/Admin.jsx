import { Plus, Trash2, Edit2, LogOut, BarChart3, Package, Upload, Gamepad2, X, Image as ImageIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { saveGamesToFirebase, getGamesFromFirebase, saveProductsToFirebase, getProductsFromFirebase } from '../authClient'

export default function Admin({ user, onLogout }) {
  const fileInputRef = useRef(null)
  const gameImageFileRef = useRef(null)
  
  const [games, setGames] = useState(() => {
    const stored = localStorage.getItem('admin-games')
    if (stored) return JSON.parse(stored)
    return []
  })

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('admin-products')
    if (stored) return JSON.parse(stored)
    return []
  })

  const [loading, setLoading] = useState(true)

  // Carregar dados do Firebase ao montar o componente
  useEffect(() => {
    const loadFromFirebase = async () => {
      try {
        const gamesResult = await getGamesFromFirebase()
        const productsResult = await getProductsFromFirebase()

        if (gamesResult.success && gamesResult.games.length > 0) {
          setGames(gamesResult.games)
        }
        if (productsResult.success && productsResult.products.length > 0) {
          setProducts(productsResult.products)
        }
      } catch (error) {
        console.error('Erro ao carregar do Firebase:', error)
        // Continuar usando localStorage como fallback
      } finally {
        setLoading(false)
      }
    }

    loadFromFirebase()
  }, [])

  const [selectedGameId, setSelectedGameId] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)
  const [editingGameId, setEditingGameId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rarity: '',
    description: '',
    image: '',
    gameId: '',
    stock: ''
  })
  const [gameFormData, setGameFormData] = useState({
    name: '',
    image: '',
    description: ''
  })
  const [showProductForm, setShowProductForm] = useState(false)
  const [showGameForm, setShowGameForm] = useState(false)
  const [tab, setTab] = useState('games')
  const [imagePreview, setImagePreview] = useState(null)
  const [gameImagePreview, setGameImagePreview] = useState(null)

  // ===== GAME HANDLERS =====
  const handleNewGame = () => {
    setGameFormData({
      name: '',
      image: '',
      description: ''
    })
    setGameImagePreview(null)
    setEditingGameId(null)
    setShowGameForm(true)
  }

  const handleEditGame = (game) => {
    setGameFormData(game)
    setGameImagePreview(game.image)
    setEditingGameId(game.id)
    setShowGameForm(true)
  }

  const handleGameImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setGameFormData({ ...gameFormData, image: base64 })
      setGameImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveGame = async () => {
    if (!gameFormData.name || !gameFormData.image) {
      alert('Nome e imagem são obrigatórios!')
      return
    }

    try {
      let updated
      if (editingGameId) {
        updated = games.map(g => g.id === editingGameId ? { ...gameFormData, id: editingGameId } : g)
      } else {
        const newGame = {
          id: Math.max(...games.map(g => g.id), 0) + 1,
          ...gameFormData
        }
        updated = [...games, newGame]
      }
      
      setGames(updated)
      localStorage.setItem('admin-games', JSON.stringify(updated))
      
      // Salvar no Firebase também
      await saveGamesToFirebase(updated)
      
      setShowGameForm(false)
      setGameFormData({ name: '', image: '', description: '' })
      setGameImagePreview(null)
      alert(editingGameId ? 'Jogo atualizado!' : 'Jogo criado!')
    } catch (error) {
      console.error('Erro ao salvar jogo:', error)
      alert('Erro ao salvar. Verifique o console.')
    }
  }

  const handleDeleteGame = async (id) => {
    if (window.confirm('Tem certeza? Todos os produtos deste jogo serão deletados!')) {
      try {
        const updatedGames = games.filter(g => g.id !== id)
        const updatedProducts = products.filter(p => p.gameId !== id)
        setGames(updatedGames)
        setProducts(updatedProducts)
        localStorage.setItem('admin-games', JSON.stringify(updatedGames))
        localStorage.setItem('admin-products', JSON.stringify(updatedProducts))
        
        // Salvar no Firebase
        await saveGamesToFirebase(updatedGames)
        await saveProductsToFirebase(updatedProducts)
        
        if (selectedGameId === id) setSelectedGameId(null)
        alert('Jogo deletado!')
      } catch (error) {
        console.error('Erro ao deletar jogo:', error)
        alert('Erro ao deletar. Verifique o console.')
      }
    }
  }

  // ===== PRODUCT HANDLERS =====
  const handleNewProduct = () => {
    let gameId = selectedGameId
    
    // Se não houver jogo selecionado, criar um automaticamente
    if (!gameId) {
      if (games.length === 0) {
        const defaultGame = {
          id: 1,
          name: 'Produtos Padrão',
          image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FF6B35" width="100" height="100"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central">📦</text></svg>',
          description: 'Categoria padrão de produtos'
        }
        const updatedGames = [defaultGame]
        setGames(updatedGames)
        localStorage.setItem('admin-games', JSON.stringify(updatedGames))
        gameId = 1
        setSelectedGameId(1)
      } else {
        // Usar o primeiro jogo da lista
        gameId = games[0].id
        setSelectedGameId(games[0].id)
      }
    }
    
    setFormData({
      name: '',
      price: '',
      rarity: '',
      description: '',
      image: '',
      gameId: gameId,
      stock: ''
    })
    setImagePreview(null)
    setEditingProductId(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
    setFormData(product)
    setImagePreview(product.image)
    setEditingProductId(product.id)
    setShowProductForm(true)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setFormData({ ...formData, image: base64 })
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price) {
      alert('Nome e preço são obrigatórios!')
      return
    }

    if (!formData.image) {
      alert('Selecione uma imagem para o produto!')
      return
    }

    try {
      let updated
      if (editingProductId) {
        updated = products.map(p => p.id === editingProductId ? { ...formData, id: editingProductId } : p)
      } else {
        const newProduct = {
          ...formData,
          id: Math.max(...products.map(p => p.id), 0) + 1,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 999
        }
        updated = [...products, newProduct]
      }

      setProducts(updated)
      localStorage.setItem('admin-products', JSON.stringify(updated))
      
      // Salvar no Firebase
      await saveProductsToFirebase(updated)
      
      setShowProductForm(false)
      setImagePreview(null)
      alert(editingProductId ? 'Produto atualizado!' : 'Produto criado!')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar. Verifique o console.')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        const updated = products.filter(p => p.id !== id)
        setProducts(updated)
        localStorage.setItem('admin-products', JSON.stringify(updated))
        
        // Salvar no Firebase
        await saveProductsToFirebase(updated)
        
        alert('Produto deletado!')
      } catch (error) {
        console.error('Erro ao deletar produto:', error)
        alert('Erro ao deletar. Verifique o console.')
      }
    }
  }

  // Stats
  const stats = {
    totalGames: games.length,
    totalProducts: products.length,
    totalStock: products.reduce((acc, p) => acc + p.stock, 0),
    avgPrice: products.length > 0 ? (products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2) : 0
  }

  const gameProducts = selectedGameId ? products.filter(p => p.gameId === selectedGameId) : []
  const selectedGame = games.find(g => g.id === selectedGameId)

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="mb-4 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 flex items-center gap-2">
            <div className="animate-spin">⏳</div>
            <span>Carregando dados do Firebase...</span>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Painel Administrativo</h1>
            <p className="text-gray-400 mt-1">Gerenciar jogos e produtos da loja</p>
            <p className="text-xs text-green-400 mt-2">🔥 Dados sincronizados com Firebase</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
          >
            <LogOut size={18} />
            Sair do Admin
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Jogos</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">{stats.totalGames}</p>
              </div>
              <Gamepad2 size={40} className="text-purple-400/30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Produtos</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalProducts}</p>
              </div>
              <Package size={40} className="text-blue-400/30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Itens em Estoque</p>
                <p className="text-3xl font-bold text-green-400 mt-2">{stats.totalStock}</p>
              </div>
              <Package size={40} className="text-green-400/30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl border border-orange-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Preço Médio</p>
                <p className="text-3xl font-bold text-orange-400 mt-2">R$ {stats.avgPrice}</p>
              </div>
              <BarChart3 size={40} className="text-orange-400/30" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setTab('games')}
            className={`px-4 py-3 font-semibold transition-colors flex items-center gap-2 ${
              tab === 'games'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Gamepad2 size={18} />
            Jogos
          </button>
          <button
            onClick={() => setTab('products')}
            className={`px-4 py-3 font-semibold transition-colors flex items-center gap-2 ${
              tab === 'products'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package size={18} />
            Produtos
          </button>
        </div>

        {/* GAMES TAB */}
        {tab === 'games' && (
          <>
            {!showGameForm && (
              <button
                onClick={handleNewGame}
                className="mb-6 flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
              >
                <Plus size={20} />
                Novo Jogo
              </button>
            )}

            {/* Game Form */}
            {showGameForm && (
              <div className="mb-8 bg-gray-900 rounded-xl border border-gray-800 p-6 sticky top-24 z-40">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">
                    {editingGameId ? '✏️ Editar Jogo' : '➕ Novo Jogo'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowGameForm(false)
                      setGameImagePreview(null)
                    }}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Form Fields */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Nome do Jogo *</label>
                        <input
                          type="text"
                          placeholder="Ex: Roblox"
                          value={gameFormData.name}
                          onChange={(e) => setGameFormData({ ...gameFormData, name: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Descrição</label>
                        <textarea
                          placeholder="Descrição do jogo..."
                          value={gameFormData.description}
                          onChange={(e) => setGameFormData({ ...gameFormData, description: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          rows="5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Logo/Imagem do Jogo *
                    </label>
                    <input
                      ref={gameImageFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleGameImageUpload}
                      className="hidden"
                    />
                    
                    {!gameImagePreview ? (
                      <button
                        type="button"
                        onClick={() => gameImageFileRef.current?.click()}
                        className="w-full h-64 border-2 border-dashed border-orange-500/50 hover:border-orange-500 rounded-xl flex flex-col items-center justify-center gap-3 text-orange-400 hover:text-orange-300 transition-colors bg-gray-800/30 hover:bg-gray-800/50"
                      >
                        <Upload size={40} />
                        <div className="text-center">
                          <p className="font-semibold">Clique para enviar logo</p>
                          <p className="text-xs text-gray-400 mt-1">ou arraste a imagem aqui</p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative">
                        <img
                          src={gameImagePreview}
                          alt="Preview"
                          className="w-full h-64 object-contain bg-gray-800 rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setGameImagePreview(null)
                            setGameFormData({ ...gameFormData, image: '' })
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => gameImageFileRef.current?.click()}
                          className="absolute bottom-2 right-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
                  <button
                    onClick={handleSaveGame}
                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    {editingGameId ? 'Atualizar Jogo' : 'Criar Jogo'}
                  </button>
                  <button
                    onClick={() => {
                      setShowGameForm(false)
                      setGameImagePreview(null)
                    }}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <div key={game.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-colors">
                  <img src={game.image} alt={game.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{game.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                    <p className="text-orange-400 text-sm mb-4 font-semibold">
                      {products.filter(p => p.gameId === game.id).length} produtos
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditGame(game)}
                        className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteGame(game.id)}
                        className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {games.length === 0 && !showGameForm && (
              <div className="text-center py-12">
                <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Nenhum jogo criado ainda. Crie um novo jogo para começar!</p>
              </div>
            )}
          </>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <>
            {/* Game Selector */}
            <div className="mb-6 bg-gray-900 rounded-xl border border-gray-800 p-4">
              <p className="text-gray-400 text-sm mb-3 font-semibold">Selecione um Jogo:</p>
              <div className="flex flex-wrap gap-2">
                {games.map(game => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGameId(game.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedGameId === game.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {game.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedGame && (
              <>
                <div className="mb-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-xl border border-orange-500/30 p-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedGame.image} alt={selectedGame.name} className="w-20 h-20 object-contain bg-gray-800 rounded-lg" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedGame.name}</h2>
                      <p className="text-gray-400 mt-1">{gameProducts.length} produtos</p>
                    </div>
                  </div>
                </div>

                {!showProductForm && (
                  <button
                    onClick={handleNewProduct}
                    className="mb-6 flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Plus size={20} />
                    Novo Produto
                  </button>
                )}

                {/* Product Form */}
                {showProductForm && (
                  <div className="mb-8 bg-gray-900 rounded-xl border border-gray-800 p-6 sticky top-24 z-40">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">
                        {editingProductId ? '✏️ Editar Produto' : '➕ Novo Produto'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowProductForm(false)
                          setImagePreview(null)
                        }}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <X size={20} className="text-gray-400" />
                      </button>
                    </div>

                    {/* Product Form Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left: Form Fields */}
                      <div>
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Nome do Produto *</label>
                            <input
                              type="text"
                              placeholder="Ex: Grand Taco Dorado"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-2">Preço (R$) *</label>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                                step="0.01"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-300 mb-2">Estoque</label>
                              <input
                                type="number"
                                placeholder="999"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Raridade</label>
                            <div className="grid grid-cols-4 gap-2">
                              {['Comum', 'Raro', 'Épico', 'Lendário'].map((rarity) => (
                                <button
                                  key={rarity}
                                  onClick={() => setFormData({ ...formData, rarity })}
                                  className={`py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                                    formData.rarity === rarity
                                      ? 'bg-orange-500 text-white'
                                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                  }`}
                                >
                                  {rarity}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Descrição</label>
                            <textarea
                              placeholder="Descreva o produto..."
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                              rows="3"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Image Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Imagem do Produto *
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        
                        {!imagePreview ? (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-64 border-2 border-dashed border-orange-500/50 hover:border-orange-500 rounded-xl flex flex-col items-center justify-center gap-3 text-orange-400 hover:text-orange-300 transition-colors bg-gray-800/30 hover:bg-gray-800/50"
                          >
                            <Upload size={40} />
                            <div className="text-center">
                              <p className="font-semibold">Clique para enviar imagem</p>
                              <p className="text-xs text-gray-400 mt-1">ou arraste uma imagem aqui</p>
                            </div>
                          </button>
                        ) : (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover bg-gray-800 rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setFormData({ ...formData, image: '' })
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute bottom-2 right-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
                      <button
                        onClick={handleSaveProduct}
                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={20} />
                        {editingProductId ? 'Atualizar Produto' : 'Criar Produto'}
                      </button>
                      <button
                        onClick={() => {
                          setShowProductForm(false)
                          setImagePreview(null)
                        }}
                        className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gameProducts.map((product) => (
                    <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/20">
                      {/* Product Image */}
                      <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-600">
                            <ImageIcon size={40} />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h4>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl font-bold text-orange-400">R$ {product.price.toFixed(2)}</div>
                          <div className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full">
                            {product.rarity || 'N/A'}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-400 text-sm line-clamp-2">{product.description || 'Sem descrição'}</p>
                          <p className="text-green-400 text-sm font-semibold mt-2">📦 Estoque: {product.stock}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
                          >
                            <Edit2 size={16} />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
                          >
                            <Trash2 size={16} />
                            Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!selectedGame && games.length > 0 && (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Selecione um jogo para gerenciar seus produtos</p>
              </div>
            )}

            {games.length === 0 && (
              <div className="text-center py-12">
                <Gamepad2 size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Nenhum jogo criado. Crie um jogo na aba "Jogos" primeiro!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
