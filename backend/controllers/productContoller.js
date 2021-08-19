import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
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
  const products = await Product.find({}).sort({ created: -1 }).limit(6)
  res.json(products)
})
2

// Product.find({
//         userId: data.id
//     },null,{ sort :{ createdOn : -1}},function(err, products) {...});

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

const getProductsBySlug = (req, res) => {
  const { slug } = req.params

  Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error })
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error })
          }

          if (products.length > 0) {
            res.status(200).json({
              products,
              productsByPrice: {
                under30: products.filter((product) => product.price <= 30),
                under40: products.filter(
                  (product) => product.price > 30 && product.price <= 40
                ),
                under50: products.filter(
                  (product) => product.price > 40 && product.price <= 50
                ),
              },
            })
          }
        })
      }
    })
}

const getProductDetailsById = (req, res) => {
  const { productId } = req.params
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error })
      if (product) {
        res.status(200).json({ product })
      }
    })
  } else {
    return res.status(400).json({ error: 'Params required' })
  }
}

export {
  getProducts,
  getProductById,
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
}
