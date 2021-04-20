import Category from '../../models/categoryModel.js'
import Product from '../../models/productModel.js'

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
      children: createCategories(categories, cate._id),
    })
  }

  return categoryList
}

export const initialData = async (req, res) => {
  const categories = await Category.find({}).exec()
  const products = await Product.find({}).select(
    '_id name price quantity slug description productPictures category'
  )
  // .populate('category')
  res.status(200).json({
    categories: createCategories(categories),
    products,
  })
}