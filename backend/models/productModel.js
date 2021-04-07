import mongoose from 'mongoose'

// const reviewSchema = mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//   },
//   {
//     timestamp: true,
//   }
// )

const productSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sku: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },
  productPictures: [{ img: { type: String } }],

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

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  slug: { type: String, sparse: true, required: true },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  quantity: {
    type: Number,
    required: true,
  },

  taxable: {
    type: Boolean,
    default: false,
  },

  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      review: String,
    },
  ],

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

  updatedAt: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

const Product = mongoose.model('Product', productSchema)

export default Product
