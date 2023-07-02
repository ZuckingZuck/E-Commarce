const Product = require('../models/Product');

const getProducts = async (req, res, next) => {

    const products = await Product.find({}).sort({createdAt: -1});
    res.status(200).json({products});
}

const getOneProduct = async(req,res) => {
    const { productId } = req.params;
    const product = await Product.findOne({_id: productId});
    res.status(200).json(product);
}

const postProduct = (req,res) => {
    const {
        brand,
        productName,
        productImg,
        stock,
        topCategory,
        subCategory,
        price,
    } = req.body.product;

    const product = new Product({brand: brand, productName: productName, productImage: productImg, stock: stock, topCategory: topCategory, subCategory: subCategory, price: price});
    product.save().then(() => {
        res.send(product);
    }).catch((err) => {res.json({err: err})});
}

module.exports = {
    getProducts,
    postProduct,
    getOneProduct
  }