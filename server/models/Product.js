const mongoose = require('mongoose');

const Product = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    topCategory: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    quote: {type: String}
})

module.exports = mongoose.model("Product", Product);