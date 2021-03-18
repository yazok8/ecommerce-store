import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamp: true,
  }
)

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  sku: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  imageKey: {
    type: String,
  },

  description: {
    type: String,
    trim: true,
    required: true,
  },

  brand: {
    type: String,
    default: null,
  },

  category: { type: mongoose.Schema.Types.Object, ref: 'Category' },

  slug: { type: String, sparse: true, required: true },

  price: {
    type: Number,
    required: true,
    default: 0,
  },
  taxable: {
    type: Boolean,
    default: false,
  },

  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },

  reviews: [reviewSchema],

  rating: {
    type: Number,
    required: true,
    default: 0,
  },

  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },

  offer: {
    type: Number,
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

const Product = mongoose.model('Product', productSchema)

export default Product
