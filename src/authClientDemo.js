/**
 * Modo Demo - Funciona SEM Firebase
 * Usa localStorage para guardar usuários (teste/desenvolvimento)
 * 
 * IMPORTANTE: Isso é apenas para TESTE!
 * Para produção, use Firebase real com credenciais válidas.
 */

export const registerClientDemo = async (email, password, name) => {
  try {
    // Validação básica
    if (!email || !password || !name) {
      return { success: false, error: 'Preencha todos os campos' }
    }

    // Verificar se usuário já existe
    const users = JSON.parse(localStorage.getItem('demo_users') || '{}')
    if (users[email]) {
      return { success: false, error: 'Email já cadastrado' }
    }

    // Criar novo usuário
    users[email] = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      // NÃO guardar password em plain text!
      name,
      createdAt: new Date().toISOString(),
      orders: []
    }

    localStorage.setItem('demo_users', JSON.stringify(users))
    console.log('✅ Usuário registrado (modo demo):', email)

    return {
      success: true,
      user: {
        uid: users[email].uid,
        email,
        displayName: name
      }
    }
  } catch (error) {
    console.error('❌ Erro ao registrar:', error.message)
    return { success: false, error: error.message }
  }
}

export const loginClientDemo = async (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('demo_users') || '{}')
    const user = users[email]

    if (!user || user.password !== password) {
      return { success: false, error: 'Email ou senha incorretos' }
    }

    console.log('✅ Login bem-sucedido (modo demo):', email)
    return {
      success: true,
      user: {
        uid: user.uid,
        email,
        displayName: user.name
      }
    }
  } catch (error) {
    console.error('❌ Erro ao fazer login:', error.message)
    return { success: false, error: error.message }
  }
}

export const logoutClientDemo = async () => {
  try {
    console.log('✅ Logout realizado (modo demo)')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error.message)
    return { success: false, error: error.message }
  }
}

export const saveClientOrderDemo = async (userId, orderData) => {
  try {
    const orderId = `order_${Date.now()}`
    const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]')

    orders.push({
      id: orderId,
      userId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })

    localStorage.setItem('demo_orders', JSON.stringify(orders))
    console.log('✅ Pedido salvo (modo demo):', orderId)

    return { success: true, orderId }
  } catch (error) {
    console.error('❌ Erro ao salvar pedido:', error.message)
    return { success: false, error: error.message }
  }
}
