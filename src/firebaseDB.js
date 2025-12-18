import { ref, set, get, update, remove } from 'firebase/database'
import { database } from './firebase'

/**
 * Salvar produtos no Firebase
 */
export const saveProducts = async (products) => {
  try {
    await set(ref(database, 'products'), products)
    console.log('✅ Produtos salvos no Firebase')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao salvar produtos:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter produtos do Firebase
 */
export const getProducts = async () => {
  try {
    const snapshot = await get(ref(database, 'products'))
    
    if (snapshot.exists()) {
      const products = snapshot.val()
      console.log('✅ Produtos obtidos:', Object.keys(products).length)
      return { success: true, products }
    } else {
      console.log('ℹ️ Nenhum produto encontrado')
      return { success: true, products: {} }
    }
  } catch (error) {
    console.error('❌ Erro ao obter produtos:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Atualizar estoque de produto
 */
export const updateProductStock = async (productId, newStock) => {
  try {
    await update(ref(database, `products/${productId}`), { stock: newStock })
    console.log(`✅ Estoque do produto ${productId} atualizado para ${newStock}`)
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao atualizar estoque:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Deletar produto
 */
export const deleteProduct = async (productId) => {
  try {
    await remove(ref(database, `products/${productId}`))
    console.log(`✅ Produto ${productId} deletado`)
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao deletar produto:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Salvar games (coleções de produtos)
 */
export const saveGames = async (games) => {
  try {
    await set(ref(database, 'games'), games)
    console.log('✅ Games salvos no Firebase')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao salvar games:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter games do Firebase
 */
export const getGames = async () => {
  try {
    const snapshot = await get(ref(database, 'games'))
    
    if (snapshot.exists()) {
      const games = snapshot.val()
      console.log('✅ Games obtidos:', Object.keys(games).length)
      return { success: true, games }
    } else {
      console.log('ℹ️ Nenhum game encontrado')
      return { success: true, games: {} }
    }
  } catch (error) {
    console.error('❌ Erro ao obter games:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Salvar pedido no Firebase
 */
export const savePurchaseOrder = async (orderData) => {
  try {
    const orderId = `order_${Date.now()}`
    
    await set(ref(database, `orders/${orderId}`), {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    })
    
    console.log('✅ Pedido salvo no Firebase:', orderId)
    return { success: true, orderId }
  } catch (error) {
    console.error('❌ Erro ao salvar pedido:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Obter todos os pedidos (para admin)
 */
export const getAllOrders = async () => {
  try {
    const snapshot = await get(ref(database, 'orders'))
    
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
 * Atualizar status do pedido
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await update(ref(database, `orders/${orderId}`), { status: newStatus })
    console.log(`✅ Pedido ${orderId} atualizado para ${newStatus}`)
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao atualizar pedido:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Sincronizar localStorage com Firebase (backup)
 */
export const syncLocalStorageToFirebase = async () => {
  try {
    const products = localStorage.getItem('admin-products')
    const games = localStorage.getItem('admin-games')
    const orders = localStorage.getItem('orders')
    
    if (products) await saveProducts(JSON.parse(products))
    if (games) await saveGames(JSON.parse(games))
    
    console.log('✅ Sincronização localStorage → Firebase concluída')
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao sincronizar:', error.message)
    return { success: false, error: error.message }
  }
}
