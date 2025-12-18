import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// ===== MIDDLEWARES =====
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.static(join(__dirname, 'dist')))

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// SPA fallback - serve index.html para todas as rotas não encontradas
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Erro:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 CARLSHOP - PRODUCTION           ║
╠════════════════════════════════════════╣
║ URL: http://localhost:${PORT}
║ Ambiente: ${process.env.NODE_ENV || 'development'}
║ Health: /api/health
╚════════════════════════════════════════╝
  `)
})
