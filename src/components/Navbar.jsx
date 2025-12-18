import { ShoppingCart, Menu, X, Moon, Sun, User, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ cartCount, onCartClick, currentPage, onPageChange, darkMode, onToggleDarkMode, user, onAuthClick, onClientAuthClick, onDashboardClick, onAdminClick, isAdmin, onLogout, clientUser, onClientLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleNavClick = (page) => {
    onPageChange(page)
    setIsOpen(false)
  }

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
      darkMode 
        ? 'bg-gray-900 border-orange-500/20' 
        : 'bg-white border-orange-500/30 shadow-md'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="text-2xl sm:text-3xl">🎮</div>
            <h1 className="hidden sm:block text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              CARLSHOP
            </h1>
            <h1 className="sm:hidden text-lg font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              CS
            </h1>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 lg:gap-8">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className={`font-semibold text-sm lg:text-base transition-colors ${
                  currentPage === 'home' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Início
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('products')}
                className={`font-semibold transition-colors ${
                  currentPage === 'products' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Produtos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('faq')}
                className={`font-semibold transition-colors ${
                  currentPage === 'faq' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className={`font-semibold transition-colors ${
                  currentPage === 'contact' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Contato
              </button>
            </li>
          </ul>

          {/* Dark Mode + Auth + Cart */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
            </button>

            {/* Auth / User Menu */}
            {user && user.isAdmin ? (
              // Admin user
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border border-orange-500"
                  />
                  <span className="hidden sm:inline text-sm font-semibold">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 top-full mt-2 w-48 border rounded-lg shadow-lg z-50 transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          onAdminClick()
                          setShowUserMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-orange-400' 
                            : 'hover:bg-gray-100 text-orange-600'
                        }`}
                      >
                        <Settings size={16} />
                        Painel Administrativo
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onLogout()
                        setShowUserMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 ${
                        isAdmin ? 'border-t' : ''
                      } ${
                        darkMode 
                          ? 'hover:bg-gray-700 border-gray-700 text-red-400' 
                          : 'hover:bg-gray-100 border-gray-200 text-red-600'
                      }`}
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : clientUser ? (
              // Client user
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <User size={14} className="text-green-500" />
                  </div>
                  <span className="hidden sm:inline text-sm font-semibold truncate max-w-[100px]">{clientUser.email?.split('@')[0] || 'Cliente'}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 top-full mt-2 w-48 border rounded-lg shadow-lg z-50 transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <button
                      onClick={() => {
                        onClientLogout()
                        setShowUserMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 border-t ${
                        darkMode 
                          ? 'hover:bg-gray-700 border-gray-700 text-red-400' 
                          : 'hover:bg-gray-100 border-gray-200 text-red-600'
                      }`}
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={onAuthClick}
                  className="hidden sm:block px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-sm"
                >
                  Admin
                </button>
                <button
                  onClick={onClientAuthClick}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors text-sm"
                >
                  Login
                </button>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 p-2 hover:bg-orange-500/10 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} className="text-orange-500" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden pb-4 border-t transition-colors ${
            darkMode 
              ? 'border-gray-800' 
              : 'border-gray-200'
          }`}>
            <ul className="flex flex-col gap-4 pt-4">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className={`font-semibold transition-colors w-full text-left ${
                    currentPage === 'home' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('products')}
                  className={`font-semibold transition-colors w-full text-left ${
                    currentPage === 'products' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('faq')}
                  className={`font-semibold transition-colors w-full text-left ${
                    currentPage === 'faq' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`font-semibold transition-colors w-full text-left ${
                    currentPage === 'contact' ? 'text-orange-500' : darkMode ? 'hover:text-orange-500' : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
