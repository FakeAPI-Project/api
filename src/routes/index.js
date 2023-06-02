const express = require('express');
const vendorRouter = require('./shopping/vendors');
const categoryRouter = require('./shopping/category');

const router = express.Router();

// Shopping API
router.use('/shopping/vendor', vendorRouter);
router.use('/shopping/category', categoryRouter);

module.exports = router;
