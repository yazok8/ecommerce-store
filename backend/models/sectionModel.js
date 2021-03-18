import mongoose from 'mongoose'
const { Schema } = mongoose

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

const Section = mongoose.model('Section', sectionSchema)

export default Section
