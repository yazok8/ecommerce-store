import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'

const createProduct = asyncHandler(async (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body })

  const { name, price, description, category, quantity, createdBy } = req.body
  let productPictures = []

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename }
    })
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  })

  product.save((error, product) => {
    if (error) return res.status(400).json({ error })
    if (product) {
      res.status(201).json({ product, files: req.files })
    }
  })
})

// @desc fetch all shop products...
// @route GET /api/shop...
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc fetch a single product...
// @route GET /api/shop/:id...
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, createProduct }
