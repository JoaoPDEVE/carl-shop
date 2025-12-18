import { useState, useEffect } from 'react'
import { ArrowLeft, Package, Calendar, User, Mail } from 'lucide-react'
import { getClientOrders } from '../authClient'

export default function ClientDashboard({ user, onBack }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      const result = await getClientOrders(user.uid)
      setLoading(false)

      if (result.success) {
        setOrders(Object.values(result.orders || {}))
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Faça login para ver seus pedidos</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white">📦 Meus Pedidos</h1>
            <p className="text-slate-400">Histórico de suas compras</p>
          </div>
        </div>

        {/* Info do usuário */}
        <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Usuário</p>
              <p className="text-white font-semibold flex items-center gap-2">
                <User size={18} /> {user.email}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Total de Pedidos</p>
              <p className="text-white font-semibold text-2xl">{orders.length}</p>
            </div>
          </div>
        </div>

        {/* Pedidos */}
        {loading ? (
          <div className="text-center">
            <p className="text-slate-300">⏳ Carregando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center bg-slate-900 border border-slate-700 rounded-lg p-12">
            <Package size={48} className="text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum pedido realizado</h3>
            <p className="text-slate-400">Comece a comprar e seus pedidos aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-700 hover:border-orange-500/50 rounded-lg p-6 transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* ID e Status */}
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Pedido ID</p>
                    <p className="text-white font-mono text-sm break-all">{order.id}</p>
                  </div>

                  {/* Data */}
                  <div>
                    <p className="text-slate-400 text-sm mb-1 flex items-center gap-1">
                      <Calendar size={16} /> Data
                    </p>
                    <p className="text-white">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Status</p>
                    <div className="inline-block">
                      {order.status === 'pending' && (
                        <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                          ⏳ Pendente
                        </span>
                      )}
                      {order.status === 'completed' && (
                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                          ✅ Concluído
                        </span>
                      )}
                      {order.status === 'failed' && (
                        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                          ❌ Falhou
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Total</p>
                    <p className="text-white font-bold text-lg">
                      R$ {order.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Itens */}
                {order.itens && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm mb-2">Items:</p>
                    <p className="text-slate-300 text-sm">{order.itens}</p>
                  </div>
                )}

                {/* Método de Pagamento */}
                {order.paymentMethod && (
                  <div className="mt-4">
                    <p className="text-slate-400 text-sm">
                      💳 Pagamento: <span className="text-orange-400">{order.paymentMethod}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Botão Voltar */}
        <div className="mt-8">
          <button
            onClick={onBack}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition"
          >
            ← Voltar à Loja
          </button>
        </div>
      </div>
    </div>
  )
}
