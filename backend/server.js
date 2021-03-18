import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'

import shopRoutes from './routes/shopRoutes.js'

import sectionRoutes from './routes/sectionRoutes.js'

import categoryRoutes from './routes/categoryRoutes.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(express.json())

app.use('/api/shop', shopRoutes)

app.use('/api/collection', sectionRoutes)

app.use('/api/category', categoryRoutes)

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
