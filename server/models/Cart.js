const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    ProductId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model("Cart", Cart);  