import mongoose from 'mongoose'

const pageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banners: [
      {
        img: { type: String },
        navigateTo: { type: String },
      },
    ],
    products: [
      {
        img: {
          type: String,
        },
        navigateTo: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestampe: true }
)

const Page = mongoose.model('Page', pageSchema)

export default Page
