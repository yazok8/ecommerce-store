require("dotenv").config()
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('MongoDB is connected');
    } catch (err) {
      console.log(err.message);
      //Exit process with failure
      process.exit(1);
    }
  };
  
  module.exports = connectDB;