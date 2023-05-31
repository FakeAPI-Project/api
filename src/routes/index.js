const express = require('express');
const vendorRouter = require('./shopping/vendors');

const router = express.Router();

// Shopping API
router.use('/shopping/vendor', vendorRouter);

module.exports = router;
