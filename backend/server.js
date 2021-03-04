import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import products from './data/products.js'
import connectDB from './config/db.js'

connectDB()

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/products/', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
