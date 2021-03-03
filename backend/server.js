require('dotenv').config()
const express = require('express')
const products = require('./data/products')
const connectDB = require('./config/db')

connectDB()

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

app.listen(PORT, () => console.log(`server running on ${PORT}`))
