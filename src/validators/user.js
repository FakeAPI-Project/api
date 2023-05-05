const { validationResult } = require('express-validator');
const httpCodes = require('../constants/httpCodes');
const { User } = require('../db/models/index');

const USERS_PER_PAGE = 10;

const existPageNumber = async (value, { req }) => {
  const count = await User.count();
  const pages = Math.ceil(count / USERS_PER_PAGE);

  if (typeof(value) === 'number' && (value < 1 || value > pages)) {
    throw new Error('No records here.');
  }

  req.extra = {
    count,
    pages,
  };
};

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(httpCodes.BAD_REQUEST)
      .json({
        status: 'err',
        messages: result.array().map(err => err.msg),
      });

    return;
  }

  next();
};

module.exports = {
  existPageNumber,
  validate,
};
