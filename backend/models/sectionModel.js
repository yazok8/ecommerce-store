import mongoose from 'mongoose'
const { Schema } = mongoose

// const productSchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.ObjectId,
//   name: { type: String, required: true },
//   image: {
//     type: String,
//     required: true,
//   },
//   imageKey: {
//     type: String,
//   },

//   description: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },

//   price: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   taxable: {
//     type: Boolean,
//     default: false,
//   },

//   countInStock: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   rating: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// })

const sectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  category: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },

  image: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },

  parentId: {
    type: String,
  },

  products: [
    {
      type: Object,
      required: true,
      ref: 'Product',
    },
  ],

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

const Sections = mongoose.model('Section', sectionSchema)

export default Sections
