const mongoose = require('mongoose');
const Order = mongoose.Schema({
    Products: {
        type: Array,
        required: true
    },
    UserId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Hazırlanıyor"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", Order);  