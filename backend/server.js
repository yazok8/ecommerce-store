import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import connectDB from './config/db.js'
import { errorHandler } from './middleware/errorMiddleware.js'

import adminRoutes from './routes/admin/auth.js'

import authRoutes from './routes/authRoutes.js'

import shopRoutes from './routes/shopRoutes.js'

import categoryRoutes from './routes/categoryRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(express.json())

app.use('/api/users', authRoutes)

app.use('/api', adminRoutes)

app.use('/api/shop', shopRoutes)

app.use('/api/category', categoryRoutes)

app.use('/api', cartRoutes)

//Error NotFound
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
