import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB is connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold)
    //Exit process with failure
    process.exit(1)
  }
}

export default connectDB
