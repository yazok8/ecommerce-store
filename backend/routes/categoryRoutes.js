import express from 'express'
import slugify from 'slugify'
import asyncHandler from 'express-async-handler'

import Category from '../models/categoryModel.js'

const router = express.Router()

function createCategories(categories, parentId = null) {
  const categoryList = []

  let category

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined)
  } else {
    category = categories.filter((cat) => cat.parentId == parentId)
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    })
  }

  return categoryList
}

router.post(
  '/create',
  asyncHandler(async (req, res) => {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    }

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj)
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error })
      if (category) {
        return res.status(201).json({ category })
      }
    })
  })
)

router.get(
  '/getcategory',
  asyncHandler(async (req, res) => {
    Category.find({}).exec((error, categories) => {
      if (error) {
        if (error) return res.status(400).json({ error })
      }
      if (categories) {
        const categoryList = createCategories(categories)
        return res.status(200).json({ categoryList })
      }
    })
  })
)
export default router
