import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// INSTRUÇÕES:
// 1. Ir em https://firebase.google.com/
// 2. Create a new project
// 3. Enable Realtime Database
// 4. Enable Authentication (Email/Password)
// 5. Copiar credenciais e adicionar abaixo

const firebaseConfig = {
  // ADICIONAR SUAS CREDENCIAIS AQUI
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key-for-testing-only',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'seu-project.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://seu-project.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'seu-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'seu-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123'
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar serviços
export const database = getDatabase(app)
export const auth = getAuth(app)

// Verificar se credenciais estão configuradas
const hasValidConfig = import.meta.env.VITE_FIREBASE_API_KEY && 
                       import.meta.env.VITE_FIREBASE_PROJECT_ID

if (hasValidConfig) {
  console.log('🔥 Firebase inicializado com credenciais reais')
} else {
  console.warn('⚠️ Firebase usando credenciais de exemplo - Configure .env.local para produção')
  console.warn('📝 Veja SETUP_FIREBASE.md para instruções')
}
