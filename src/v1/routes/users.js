const express = require('express');
const { query } = require('express-validator');
const { index, show, store, update, destroy } = require('../controllers/users');
const { existPageNumber, validate } = require('../validators/user');

const router = express.Router();

router.get('/', [
  query('page', 'Page number is not valid.').optional().isNumeric(),
  query('page').custom(existPageNumber),
  validate,
], index);

router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
