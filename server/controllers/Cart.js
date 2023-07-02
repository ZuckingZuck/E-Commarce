const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res, next) => {
    const user = req.user;
    
    try {
        const cart = await Cart.find({UserId: user._id});
        res.status(200).json(cart);

    } catch (error) {
        res.status(404).json({'error': error})
    }
}

const addtoCart = async (req,res) => {
    const { ProductId } = req.body;
    const UserId = req.user._id;

    try {
        const item = await Cart.findOne({ProductId, UserId})

        if(item){
            item.set({quantity: item.quantity+1});
            await item.save();
        }else{
            await Cart.create({UserId, ProductId})
        }

        const cart = await Cart.find({UserId});
        res.status(200).json(cart);
        
    } catch (error) {
        console.log('addtocart hata');
        res.status(401).json({'error': error.message})
    }
}

const deleteFromCart = async (req,res) => {
    const { id } = req.body;
    try {
        const deletedItem = await Cart.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
    } catch (error) {
        console.log(error);
        res.status(401).json({'error': error})
    }
}

const updateCart = async (req,res) => {
    const { id, value } = req.body;
    console.log(id, value);

    try {
        const updateItem = await Cart.findOneAndUpdate({_id: id}, {quantity: value});
        updateItem.save();
        res.status(200).json(updateItem);
    } catch (error) {
        console.log(error, 'updatecart error');
        res.status(404).json({error: error});
    }
}



module.exports = {
    getCart,
    addtoCart,
    deleteFromCart, updateCart
  }