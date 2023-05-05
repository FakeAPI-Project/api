const httpCodes = require('../../constants/httpCodes');
const { User } = require('../../db/models/index');
const { getNextUrl, getPrevUrl, getIndividualUrl } = require('../helpers/api');

const USERS_PER_PAGE = 10;

// GET v1/user
const index = async (req, res) => {
  const currentPage = req.query.page ? +req.query.page : 1;
  const count = await User.count();
  const pages = Math.ceil(count / USERS_PER_PAGE);

  const next = currentPage < pages ? getNextUrl(req, currentPage) : null;
  const prev = currentPage > 1 ? getPrevUrl(req, currentPage) : null;

  const users = (await User.findAll({
    limit: USERS_PER_PAGE,
    offset: (currentPage - 1) * USERS_PER_PAGE,
  })).map(user => {
    const newUser = {...user.dataValues, url: getIndividualUrl(req, user)};
    return newUser;
  });

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      count,
      pages,
      currentPage,
      next,
      prev,
      data: users,
    });
};

// GET v1/user/:id
const show = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    res.status(httpCodes.NOT_FOUND)
      .json({
        status: 'err',
        messages: [
          'User not found.',
        ],
      });
    
    return;
  }

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: user,
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
