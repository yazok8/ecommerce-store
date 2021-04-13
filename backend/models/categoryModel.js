import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true, required: true },
    categoryPicture: { type: String },
    parentId: { type: String },
  },
  {
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
