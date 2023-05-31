const express = require('express');
const userRouter = require('./users');
const vendorRouter = require('./shopping/vendors');

const router = express.Router();

// router.use('/user', userRouter);
router.use('/shopping/vendor', vendorRouter);

module.exports = router;
