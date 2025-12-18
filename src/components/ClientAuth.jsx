import { useState } from 'react'
import { Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { registerClient, loginClient, logoutClient } from '../authClient'
import { registerClientDemo, loginClientDemo, logoutClientDemo } from '../authClientDemo'

// Função para detectar se Firebase está configurado
const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY && 
         import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-key-for-testing-only'
}

export default function ClientAuth({ isOpen, onClose, user, setUser }) {
  const [mode, setMode] = useState('login') // 'login' ou 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const isDemo = !isFirebaseConfigured()

  if (!isOpen) return null

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email || !password || !name) {
      setError('Preencha todos os campos')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    // Usar demo ou Firebase
    const registerFunc = isDemo ? registerClientDemo : registerClient
    const result = await registerFunc(email, password, name)
    setLoading(false)

    if (result.success) {
      setSuccess('✅ Conta criada com sucesso! Fazendo login...')
      // Salvar usuário no localStorage
      const userData = {
        uid: result.user.uid || result.user.email,
        email: result.user.email || email,
        displayName: name,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('cartshop-client-user', JSON.stringify(userData))
      setEmail('')
      setPassword('')
      setName('')
      setTimeout(() => {
        setUser(userData)
        onClose()
      }, 1500)
    } else {
      setError(`❌ ${result.error}`)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email || !password) {
      setError('Preencha email e senha')
      setLoading(false)
      return
    }

    // Usar demo ou Firebase
    const loginFunc = isDemo ? loginClientDemo : loginClient
    const result = await loginFunc(email, password)
    setLoading(false)

    if (result.success) {
      setSuccess('✅ Bem-vindo de volta!')
      // Salvar usuário no localStorage
      const userData = {
        uid: result.user.uid || result.user.email,
        email: result.user.email || email,
        displayName: result.user.displayName || email.split('@')[0],
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('cartshop-client-user', JSON.stringify(userData))
      setEmail('')
      setPassword('')
      setUser(userData)
      setTimeout(() => {
        onClose()
      }, 1000)
    } else {
      setError(`❌ ${result.error}`)
    }
  }

  const handleLogout = async () => {
    const logoutFunc = isDemo ? logoutClientDemo : logoutClient
    const result = await logoutFunc()
    if (result.success) {
      localStorage.removeItem('cartshop-client-user')
      setUser(null)
      setEmail('')
      setPassword('')
      setName('')
      onClose()
    }
  }

  if (user) {
    // Usuário logado
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 rounded-lg border border-orange-500/50 p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-6">👤 Sua Conta</h2>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
            <p className="text-orange-400 font-semibold mb-2">Email</p>
            <p className="text-white">{user.email}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition"
            >
              ✅ Fechar
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
            >
              🚪 Sair da Conta
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Telas de login/registro
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border border-orange-500/50 p-8 max-w-md w-full">
        {/* Botão voltar */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">
          {mode === 'login' ? '🔓 Entrar' : '📝 Criar Conta'}
        </h2>
        
        {isDemo && (
          <div className="bg-yellow-600/20 border border-yellow-600/50 rounded px-3 py-2 mb-4 text-xs text-yellow-300">
            ⚠️ Modo Demo (sem Firebase). Para produção, configure .env.local
          </div>
        )}
        <p className="text-slate-400 mb-6">
          {mode === 'login'
            ? 'Acesse sua conta de cliente'
            : 'Crie sua conta para rastrear pedidos'}
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-300 mb-2 flex items-center gap-2">
                <User size={18} />
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Pedro"
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-2 flex items-center gap-2">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 flex items-center gap-2">
              <Lock size={18} />
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? '⏳ Processando...' : mode === 'login' ? '🔓 Entrar' : '📝 Criar Conta'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-slate-400 text-center mb-3">
            {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}
          </p>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login')
              setError('')
              setSuccess('')
              setEmail('')
              setPassword('')
              setName('')
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold py-2 rounded-lg transition"
          >
            {mode === 'login' ? '📝 Criar uma agora' : '🔓 Fazer login'}
          </button>
        </div>
      </div>
    </div>
  )
}
