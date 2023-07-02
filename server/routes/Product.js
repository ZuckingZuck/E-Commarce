const express = require('express');
const router = express.Router();
const { getProducts, postProduct, getOneProduct } = require('../controllers/Product');
const requireAuth = require('../middleware/requireAuth');

router.get('/', getProducts);
router.get('/:productId', getOneProduct);
router.use(requireAuth);
router.post('/additem', postProduct);

module.exports = router;