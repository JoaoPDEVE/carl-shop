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
import Auth from './components/Auth'
import ClientAuth from './components/ClientAuth'
import AdminPanel from './components/AdminPanel'
import ClientDashboard from './components/ClientDashboard'
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
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cartshop-user')
    return saved ? JSON.parse(saved) : null
  })
  const [showAuth, setShowAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminProducts, setAdminProducts] = useState(() => {
    const stored = localStorage.getItem('admin-products')
    return stored ? JSON.parse(stored) : []
  })
  const [adminGames, setAdminGames] = useState(() => {
    const stored = localStorage.getItem('admin-games')
    return stored ? JSON.parse(stored) : []
  })
  const [showClientAuth, setShowClientAuth] = useState(false)
  const [clientUser, setClientUser] = useState(() => {
    const saved = localStorage.getItem('cartshop-client-user')
    return saved ? JSON.parse(saved) : null
  })

  // Recarregar produtos quando retornar da página admin
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('admin-products')
      setAdminProducts(stored ? JSON.parse(stored) : [])
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Também verificar periodicamente (para atualizações na mesma aba)
    const interval = setInterval(() => {
      const stored = localStorage.getItem('admin-products')
      const parsed = stored ? JSON.parse(stored) : []
      setAdminProducts(parsed)
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
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

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('cartshop-darkmode', JSON.stringify(newValue))
      return newValue
    })
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('cartshop-user')
    setIsAdmin(false)
    setCurrentPage('home')
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setShowAuth(false)
    // Admin access verifying isAdmin property
    if (userData.isAdmin) {
      setIsAdmin(true)
      setCurrentPage('admin')
    }
  }

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
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onClientAuthClick={() => setShowClientAuth(true)}
        onDashboardClick={() => setCurrentPage('dashboard')}
        onAdminClick={() => setCurrentPage('admin')}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        clientUser={clientUser}
        onClientLogout={() => {
          setClientUser(null)
          localStorage.removeItem('cartshop-client-user')
        }}
      />
      
      <Auth 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onLogin={handleLogin}
      />

      <ClientAuth
        isOpen={showClientAuth}
        onClose={() => setShowClientAuth(false)}
        user={clientUser}
        setUser={setClientUser}
      />
      
      <Catalog isOpen={showCatalog} onClose={() => setShowCatalog(false)} onAddToCart={addToCart} user={user} darkMode={darkMode} />
      <Checkout isOpen={showCheckout} onClose={() => setShowCheckout(false)} totalPrice={totalPrice} items={cart} user={user} setCart={setCart} />
      
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
          {(currentPage === 'admin' || currentPage === 'dashboard') && isAdmin && (
            <AdminPanel
              user={user}
              onLogout={() => {
                setIsAdmin(false)
                handleLogout()
              }}
            />
          )}
        </>
      )}
      
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
