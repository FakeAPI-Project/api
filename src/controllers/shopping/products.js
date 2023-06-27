const httpCodes = require('../../constants/httpCodes');
const { ShoppingProduct } = require('../../db/models/index');
const { getNextUrl, getPrevUrl, getIndividualUrl } = require('../../helpers/api');

const PRODUCTS_PER_PAGE = 10;

// GET shopping/product
const index = async (req, res) => {
  const currentPage = req.query.page ? +req.query.page : 1;

  const next = currentPage < req.extra.pages ? getNextUrl(req, currentPage) : null;
  const prev = currentPage > 1 ? getPrevUrl(req, currentPage) : null;

  const productsInstances = await ShoppingProduct.findAll({
    limit: PRODUCTS_PER_PAGE,
    offset: (currentPage - 1) * PRODUCTS_PER_PAGE,
  });

  const products = await Promise.all(productsInstances.map(async (product) => {
    const vendor = await product.getShoppingVendor();
    const category = await product.getShoppingCategory();

    const newProduct = {
      ...product.dataValues,
      vendor: {
        name: vendor.name,
        url: getIndividualUrl(req, vendor, {
          baseUrl: '/shopping/vendor',
        }),
      },
      category: {
        name: category.name,
        url: getIndividualUrl(req, category, {
          baseUrl: '/shopping/category',
        }),
      },
      url: getIndividualUrl(req, product)
    };
    
    return newProduct;
  }));

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      count: req.extra.count,
      pages: req.extra.pages,
      currentPage,
      next,
      prev,
      data: products,
    });
};

// GET shopping/product/:id
const show = async (req, res) => {
  const productInstace = await ShoppingProduct.findByPk(req.params.id);

  if (!productInstace) {
    res.status(httpCodes.NOT_FOUND)
      .json({
        status: 'err',
        messages: [
          'Product not found.',
        ],
      });
    
    return;
  }

  const vendor = await productInstace.getShoppingVendor();
  const category = await productInstace.getShoppingCategory();

  const product = {
    ...productInstace.dataValues,
    vendor: {
      name: vendor.name,
      url: getIndividualUrl(req, vendor, {
        baseUrl: '/shopping/vendor'
      }),
    },
    category: {
      name: category.name,
      url: getIndividualUrl(req, category, {
        baseUrl: '/shopping/category'
      }),
    },
  }

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: product,
    });
};

// POST shopping/product
const store = (req, res) => {
  res.status(httpCodes.CREATED)
    .json({
      status: 'ok',
      data: {
        message: 'Create a product',
      },
    });
};

// PUT shopping/product/:id
const update = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Update a product',
      },
    });
};

// DELETE shopping/product/:id
const destroy = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Delete a product',
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
