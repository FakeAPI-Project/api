const express = require('express');
const vendorRouter = require('./shopping/vendors');
const categoryRouter = require('./shopping/category');
const productRouter = require('./shopping/product');

const router = express.Router();

// Shopping API
router.use('/shopping/vendor', vendorRouter);
router.use('/shopping/category', categoryRouter);
router.use('/shopping/product', productRouter);

module.exports = router;
