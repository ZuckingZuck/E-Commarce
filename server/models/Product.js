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

Product.statics.sendPrice = async function(ids) {
    let totalPrice = 0;
    let promises = ids.map(async (e) => {
      console.log(e.quantity);
      let price = await this.findOne({ _id: e.ProductId });
      let total = e.quantity * parseFloat(price.price);
      return total;
    });
  
    let prices = await Promise.all(promises);
  

    prices.forEach((total) => {
      totalPrice += total;
    });
  
    return totalPrice;
};

Product.statics.sendOrders = async function(ids) {
    let promises = ids.map(async (e) => {
      let product = await this.findOne({ _id: e.ProductId }).select("brand").select("productName").select("productImage").select("topCategory").select("subCategory").select("price").select("stock");
      product.set({stock: product.stock - e.quantity})
      product.save()
      let total = {product, quantity: e.quantity}
      return total;
    });
  
    
    let orders = await Promise.all(promises);

  
    return orders;
};


  

module.exports = mongoose.model("Product", Product);