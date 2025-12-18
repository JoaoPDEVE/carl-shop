import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const app = express()
const PORT = process.env.PORT || 5000

// ===== MIDDLEWARES =====

// CORS configurado para produção
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// ===== RATE LIMITING (básico) =====
const requestCounts = new Map()
const RATE_LIMIT = 100 // requisições
const RATE_LIMIT_WINDOW = 60000 // por minuto

const rateLimit = (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress
  const now = Date.now()
  
  if (!requestCounts.has(clientIp)) {
    requestCounts.set(clientIp, [])
  }
  
  const requests = requestCounts.get(clientIp)
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Muitas requisições. Tente novamente mais tarde.' })
  }
  
  recentRequests.push(now)
  requestCounts.set(clientIp, recentRequests)
  
  next()
}

app.use(rateLimit)

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// ===== EMAIL ENDPOINT =====
app.post('/api/send-email', async (req, res) => {
  try {
    const { from, to, subject, html } = req.body
    const resendApiKey = process.env.VITE_RESEND_API_KEY

    // Validações
    if (!from || !to || !subject || !html) {
      return res.status(400).json({ error: 'Campos obrigatórios: from, to, subject, html' })
    }

    if (!resendApiKey) {
      console.error('❌ Chave API Resend não encontrada')
      return res.status(500).json({ error: 'Servidor não configurado para enviar emails' })
    }

    console.log(`📨 Email para: ${to}`)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({ from, to, subject, html })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('❌ Erro Resend:', data)
      return res.status(response.status).json({ error: data.message || 'Erro ao enviar email' })
    }

    console.log('✅ Email enviado:', data.id)
    res.json({ success: true, id: data.id })
  } catch (err) {
    console.error('❌ Erro no servidor:', err.message)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// ===== PRODUTOS/PEDIDOS (para futura integração) =====

// GET todos os produtos
app.get('/api/products', (req, res) => {
  try {
    const products = JSON.parse(localStorage?.getItem('admin-products') || '[]')
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

// GET todos os games
app.get('/api/games', (req, res) => {
  try {
    const games = JSON.parse(localStorage?.getItem('admin-games') || '[]')
    res.json(games)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar games' })
  }
})

// ===== TRATAMENTO DE ERROS 404 =====
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// ===== ERRO GERAL =====
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 CARLSHOP BACKEND RODANDO       ║
╠════════════════════════════════════════╣
║ URL: http://localhost:${PORT}
║ Ambiente: ${process.env.NODE_ENV || 'development'}
║ Health Check: /api/health
╚════════════════════════════════════════╝
  `)
})
