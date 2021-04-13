import slugify from 'slugify'
import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

export const addCategory = asyncHandler(async (req, res) => {
  let categoryPicture
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryPicture,
  }

  if (req.file) {
    categoryObj.categoryPicture = '/public/' + req.file.filename
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

//this functio used for get categories
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

export const getCategories = asyncHandler(async (req, res) => {
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
