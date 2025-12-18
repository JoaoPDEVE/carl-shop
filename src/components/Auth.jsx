import { X, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'

export default function Auth({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email e senha são obrigatórios')
      return
    }

    // Verificar credenciais de admin
    const ADMIN_EMAIL = 'joaobjjpedro@gmail.com'
    const ADMIN_PASSWORD = 'mereejunior123.'

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError('❌ Email ou senha de admin incorretos.')
      return
    }

    // Autenticação bem-sucedida como admin
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Admin',
      email,
      isAdmin: true,
      joinDate: new Date().toLocaleDateString('pt-BR'),
      avatar: `https://ui-avatars.com/api/?name=Admin&background=FF6B35&color=fff`
    }

    // Salvar no localStorage
    localStorage.setItem('cartshop-user', JSON.stringify(user))
    
    onLogin(user)
    setEmail('')
    setPassword('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            🔐 Login Admin
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joaobjjpedro@gmail.com"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
            >
              ✅ Entrar como Admin
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              💡 <strong>Acesso Administrativo</strong> - Digite suas credenciais acima
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
