import slugify from 'slugify'
import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import { nanoid } from 'nanoid'

export const addCategory = asyncHandler(async (req, res) => {
  let categoryPicture
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${nanoid(4)}`,
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
      parentId: cate.parentId,
      type: cate.type,
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

export const updateCategory = asyncHandler(async (req, res) => {
  const { _id, name, parentId, type } = req.body
  const updatedCategories = []

  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      }
      if (parentId[i] !== '') {
        category.parentId = parentId[i]
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      )
      updatedCategories.push(updatedCategory)
    }
    return res.status(201).json({ updateCategory: updatedCategories })
  } else {
    const category = {
      name,
      type,
    }
    if (parentId !== '') {
      category.parentId = parentId
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    })
    res.status(201).json({ updateCategory })
  }
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const { ids } = req.body.payload

  const deletedCategories = []

  for (let i = 0; i < ids.length; i++) {
    const deleteCategories = await Category.findOneAndDelete({
      _id: ids[i]._id,
    })
    deletedCategories.push(deleteCategories)
  }

  if (deletedCategories.length == ids.length)
    res.status(201).json({ message: 'Categories removed' })
  else {
    res.status(400).json({ message: 'Something went wrong' })
  }
})
