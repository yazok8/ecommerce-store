import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// userSchema.virtual('password').set(function (paassword) {
//   this.hash_password = bcrypt.hashSync('123456', 10)
// })

userSchema.virtual('fullName').get(function () {
  return `${this.name}`
})

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password)
  },
}

const User = mongoose.model('User', userSchema)

export default User
