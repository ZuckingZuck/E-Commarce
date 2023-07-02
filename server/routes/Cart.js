const express = require('express');
const router = express.Router();
const { getCart, addtoCart, deleteFromCart, updateCart } = require('../controllers/Cart');
const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);

router.get('/', getCart);
router.post('/addtocart', addtoCart);
router.post('/delete', deleteFromCart);
router.post('/update', updateCart);

module.exports = router;