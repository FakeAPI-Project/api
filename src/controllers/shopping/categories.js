const httpCodes = require('../../constants/httpCodes');
const { ShoppingCategory } = require('../../db/models/index');
const { getNextUrl, getPrevUrl, getIndividualUrl } = require('../../helpers/api');

const CATEGORIES_PER_PAGE = 10;

// GET shopping/category
const index = async (req, res) => {
  const currentPage = req.query.page ? +req.query.page : 1;

  const next = currentPage < req.extra.pages ? getNextUrl(req, currentPage) : null;
  const prev = currentPage > 1 ? getPrevUrl(req, currentPage) : null;

  const categories = (await ShoppingCategory.findAll({
    limit: CATEGORIES_PER_PAGE,
    offset: (currentPage - 1) * CATEGORIES_PER_PAGE,
  })).map(category => {
    const newCategory = {...category.dataValues, url: getIndividualUrl(req, category)};
    return newCategory;
  });

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      count: req.extra.count,
      pages: req.extra.pages,
      currentPage,
      next,
      prev,
      data: categories,
    });
};

// GET shopping/category/:id
const show = async (req, res) => {
  const category = await ShoppingCategory.findByPk(req.params.id);

  if (!category) {
    res.status(httpCodes.NOT_FOUND)
      .json({
        status: 'err',
        messages: [
          'Category not found.',
        ],
      });
    
    return;
  }

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: category,
    });
};

// POST shopping/category
const store = (req, res) => {
  res.status(httpCodes.CREATED)
    .json({
      status: 'ok',
      data: {
        message: 'Create a category',
      },
    });
};

// PUT shopping/category/:id
const update = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Update a category',
      },
    });
};

// DELETE shopping/category/:id
const destroy = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Delete a category',
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
