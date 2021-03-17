import express from 'express'
import asyncHandler from 'express-async-handler'
import Sections from '../models/sectionModel.js'

const router = express.Router()

router.get(
  '/list',
  asyncHandler(async (req, res) => {
    const sections = await Sections.find({})
    res.json(sections)
  })
)

// fetch secti api
router.get(
  '/list/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
