import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Catalog from './components/Catalog'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import FAQ from './components/FAQ'
import GameCatalog from './components/GameCatalog'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [filter, setFilter] = useState('all')
  const [showCatalog, setShowCatalog] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cartshop-darkmode')
    return saved ? JSON.parse(saved) : false
  })
  const [adminProducts, setAdminProducts] = useState(() => {
    const stored = localStorage.getItem('admin-products')
    return stored ? JSON.parse(stored) : []
  })
  const [adminGames, setAdminGames] = useState(() => {
    const stored = localStorage.getItem('admin-games')
    return stored ? JSON.parse(stored) : []
  })

  // Recarregar produtos do localStorage
  useEffect(() => {
    // Inicializar com jogo padrão se não existir
    const stored = localStorage.getItem('admin-games')
    if (!stored || JSON.parse(stored).length === 0) {
      const defaultGames = [
        {
          id: '1',
          name: 'Grand Piece Online',
          description: 'Jogo Roblox baseado em One Piece com aventuras épicas',
          createdAt: new Date().toLocaleString('pt-BR')
        }
      ]
      localStorage.setItem('admin-games', JSON.stringify(defaultGames))
      setAdminGames(defaultGames)
    }
  }, [])

  const products = adminProducts

  const gameProducts = (gameId) => products.filter(p => p.gameId === gameId)

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.gameId === filter)

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('cartshop-darkmode', JSON.stringify(newValue))
      return newValue
    })
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar 
        cartCount={totalItems}
        onCartClick={() => setShowCart(!showCart)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <Catalog isOpen={showCatalog} onClose={() => setShowCatalog(false)} onAddToCart={addToCart} darkMode={darkMode} />
      <Checkout isOpen={showCheckout} onClose={() => setShowCheckout(false)} totalPrice={totalPrice} items={cart} setCart={setCart} />
      
      {showCart ? (
        <Cart 
          items={cart}
          totalPrice={totalPrice}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onContinueShopping={() => setShowCart(false)}
          onCheckout={() => setShowCheckout(true)}
        />
      ) : (
        <>
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={setCurrentPage} darkMode={darkMode} />
            </>
          )}
          
          {currentPage === 'products' && !selectedGame && (
            <ProductGrid 
              products={filteredProducts}
              onAddToCart={addToCart}
              filter={filter}
              onFilterChange={setFilter}
              onOpenCatalog={() => setShowCatalog(true)}
              darkMode={darkMode}
              games={adminGames}
              gameProducts={gameProducts}
              onSelectGame={(game) => {
                setSelectedGame(game)
              }}
            />
          )}

          {currentPage === 'products' && selectedGame && (
            <GameCatalog
              game={selectedGame}
              products={gameProducts(selectedGame.id)}
              onBack={() => setSelectedGame(null)}
              onAddToCart={addToCart}
              darkMode={darkMode}
            />
          )}
          
          {currentPage === 'contact' && (
            <Contact />
          )}
          {currentPage === 'faq' && (
            <FAQ />
          )}
        </>
      )}
      
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
