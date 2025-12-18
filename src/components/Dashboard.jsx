import { LogOut, Clock, DollarSign, Package, Edit2 } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function Dashboard({ user, onLogout, cart, completedOrders = [] }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: localStorage.getItem(`phone-${user.id}`) || '',
    address: localStorage.getItem(`address-${user.id}`) || ''
  })

  const handleSaveProfile = () => {
    localStorage.setItem(`phone-${user.id}`, profileData.phone)
    localStorage.setItem(`address-${user.id}`, profileData.address)
    setIsEditingProfile(false)
  }

  // Usar dados reais do localStorage
  const realOrders = useMemo(() => {
    if (!user) return []
    const purchases = JSON.parse(localStorage.getItem(`purchases-${user.id}`) || '[]')
    return purchases.map((purchase, idx) => ({
      id: purchase.id || String(idx + 1).padStart(3, '0'),
      date: new Date(purchase.date).toLocaleDateString('pt-BR'),
      items: purchase.items.map(i => `${i.name} (${i.quantity}x)`).join(', ') || 'N/A',
      total: purchase.total || 0,
      paymentMethod: purchase.paymentMethod || 'N/A',
      status: 'Entregue'
    }))
  }, [user])
  
  const mockOrders = realOrders.length > 0 ? realOrders : [
    {
      id: '000',
      date: 'N/A',
      items: 'Nenhuma compra realizada',
      total: 0,
      paymentMethod: 'N/A',
      status: 'Pendente'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-1">Bem-vindo de volta, {user.name}!</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>

        {/* Perfil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Perfil */}
          <div className="md:col-span-1 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-orange-500"
              />
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>
              <p className="text-gray-500 text-xs">
                Membro desde {user.joinDate}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Gasto</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">R$ {mockOrders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</p>
                </div>
                <DollarSign size={32} className="text-blue-400/30" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pedidos</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">{mockOrders.length}</p>
                </div>
                <Package size={32} className="text-green-400/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Perfil Detalhado */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Informações Pessoais</h3>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
            >
              <Edit2 size={16} />
              {isEditingProfile ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditingProfile ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    placeholder="(84) 99921-2498"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Endereço de Entrega
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: e.target.value })
                    }
                    placeholder="Rua, número, cidade..."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="md:col-span-2 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Salvar Alterações
                </button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold mt-1">{user.email}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Telefone</p>
                  <p className="text-white font-semibold mt-1">
                    {profileData.phone || 'Não informado'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Endereço</p>
                  <p className="text-white font-semibold mt-1 flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    {profileData.address || 'Não informado'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Histórico de Compras */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-6">Histórico de Compras</h3>

          {mockOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">Data</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold hidden md:table-cell">Itens</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">Total</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-mono">#{order.id}</td>
                      <td className="px-4 py-3 text-gray-300 flex items-center gap-2">
                        <Clock size={16} className="text-orange-500" />
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell text-sm">
                        {order.items}
                      </td>
                      <td className="px-4 py-3 text-white font-bold">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-400">Nenhum pedido realizado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
