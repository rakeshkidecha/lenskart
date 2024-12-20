const express = require('express');
const productCtl = require('../controllers/productController'); 
const Product  = require('../models/Product');

const router = express.Router();

router.get('/',productCtl.home);

router.get('/addProduct',productCtl.addProduct);

router.post('/insertProduct',Product.uploadImagesFile,productCtl.insertProduct);

router.get('/deleteProduct/:pId',productCtl.deleteProduct);

router.get('/updateProduct/:pId',productCtl.updateProduct);

router.post('/editProduct',Product.uploadImagesFile,productCtl.editProduct);

module.exports = router;