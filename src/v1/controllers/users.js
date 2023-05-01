const httpCodes = require('../../constants/httpCodes');

// GET v1/user
const index = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Get all the users',
      },
    });
};

// GET v1/user/:id
const show = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Get one user',
      },
    });
};

// POST v1/user
const store = (req, res) => {
  res.status(httpCodes.CREATED)
    .json({
      status: 'ok',
      data: {
        message: 'Create a user',
      },
    });
};

// PUT v1/user/:id
const update = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Update a user',
      },
    });
};

// DELETE v1/user/:id
const destroy = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Delete a user',
      },
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
