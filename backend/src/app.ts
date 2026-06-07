import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import dashboardRoutes from './routes/dashboard.routes'

const app = express()

// Middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

export default app
