const express = require('express');
const { query, param } = require('express-validator');
const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../../controllers/shopping/products');
const { existPageNumber, validate } = require('../../validators/shopping');

const router = express.Router();

router.get(
  '/',
  [
    query('page', 'Page number is not valid.').optional().isNumeric(),
    query('page').custom(existPageNumber),
    validate,
  ],
  index
);

router.get(
  '/:id',
  [param('id', 'Id is not valid.').isNumeric(), validate],
  show
);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
