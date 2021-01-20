const mongoose = require("mongoose"); 

const productSchema = new mongoose.Schema({
    name:{
        type: String, 
        required:true
    }, 

    description: {
        type: String, 
        required: true, 

    }, 
    price: {
        type: Number,
        required: true
    }, 

    qunatity: {
        type: Number, 
    },

    imageUrl:{
        type: String, 
        required: true
    }
})

const Product = mongoose.model("product", productSchema); 

module.export = Product; 
