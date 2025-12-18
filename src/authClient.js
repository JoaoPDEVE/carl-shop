import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import { auth, database } from './firebase'

/**
 * Registrar novo cliente
 */
export const registerClient = async (email, password, name) => {
  try {
    // Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Salvar dados adicionais no Realtime Database
    await set(ref(database, `users/${user.uid}`), {
      email: user.email,
      name: name,
      createdAt: new Date().toISOString(),
      orders: []
    })
    
    console.log('✅ Usuário registrado:', email)
    return { success: true, user }
  } catch (error) {
    console.error('❌ Erro ao registrar:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Fazer login de cliente
 */
export const loginClient = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('✅ Login bem-sucedido:', email)
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('❌ Erro ao fazer login:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Fazer logout
 */
export const logoutClient = async () => {
  try {
    await signOut(auth)
    console.log('✅ Logout realizado')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter usuário logado
 */
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user)
    })
  })
}

/**
 * Salvar pedido do cliente
 */
export const saveClientOrder = async (userId, orderData) => {
  try {
    const orderId = `order_${Date.now()}`
    
    await set(ref(database, `users/${userId}/orders/${orderId}`), {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })
    
    // Também salvar em pedidos globais para admin
    await set(ref(database, `orders/${orderId}`), {
      id: orderId,
      userId: userId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })
    
    console.log('✅ Pedido salvo:', orderId)
    return { success: true, orderId }
  } catch (error) {
    console.error('❌ Erro ao salvar pedido:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter pedidos do cliente
 */
export const getClientOrders = async (userId) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}/orders`))
    
    if (snapshot.exists()) {
      const orders = snapshot.val()
      console.log('✅ Pedidos obtidos:', Object.keys(orders).length)
      return { success: true, orders }
    } else {
      console.log('ℹ️ Nenhum pedido encontrado')
      return { success: true, orders: {} }
    }
  } catch (error) {
    console.error('❌ Erro ao obter pedidos:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Monitorar mudanças de autenticação
 */
export const watchAuthState = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// ===== ADMIN FUNCTIONS (Jogos e Produtos) =====

/**
 * Salvar todos os games no Firebase
 */
export const saveGamesToFirebase = async (games) => {
  try {
    await set(ref(database, 'admin/games'), games)
    console.log('✅ Games salvos no Firebase')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao salvar games:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter todos os games do Firebase
 */
export const getGamesFromFirebase = async () => {
  try {
    const snapshot = await get(ref(database, 'admin/games'))
    if (snapshot.exists()) {
      const games = snapshot.val()
      console.log('✅ Games obtidos do Firebase:', Object.keys(games).length)
      return { success: true, games: Array.isArray(games) ? games : Object.values(games) }
    } else {
      console.log('ℹ️ Nenhum game encontrado')
      return { success: true, games: [] }
    }
  } catch (error) {
    console.error('❌ Erro ao obter games:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Salvar todos os produtos no Firebase
 */
export const saveProductsToFirebase = async (products) => {
  try {
    await set(ref(database, 'admin/products'), products)
    console.log('✅ Produtos salvos no Firebase')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao salvar produtos:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter todos os produtos do Firebase
 */
export const getProductsFromFirebase = async () => {
  try {
    const snapshot = await get(ref(database, 'admin/products'))
    if (snapshot.exists()) {
      const products = snapshot.val()
      console.log('✅ Produtos obtidos do Firebase')
      return { success: true, products: Array.isArray(products) ? products : Object.values(products) }
    } else {
      console.log('ℹ️ Nenhum produto encontrado')
      return { success: true, products: [] }
    }
  } catch (error) {
    console.error('❌ Erro ao obter produtos:', error.message)
    return { success: false, error: error.message }
  }
}
