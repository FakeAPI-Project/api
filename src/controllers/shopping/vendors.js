const httpCodes = require('../../constants/httpCodes');
const { ShoppingVendor } = require('../../db/models/index');
const { getNextUrl, getPrevUrl, getIndividualUrl } = require('../../helpers/api');

const VENDORS_PER_PAGE = 10;

// GET shopping/vendor
const index = async (req, res) => {
  const currentPage = req.query.page ? +req.query.page : 1;

  const next = currentPage < req.extra.pages ? getNextUrl(req, currentPage) : null;
  const prev = currentPage > 1 ? getPrevUrl(req, currentPage) : null;

  const vendorsInstances = await ShoppingVendor.findAll({
    limit: VENDORS_PER_PAGE,
    offset: (currentPage - 1) * VENDORS_PER_PAGE,
  });
  
  const vendors = await Promise.all(vendorsInstances.map(async (vendor) => {
    const productsInstances = await vendor.getShoppingProduct();
    const productsLinks = [];

    for (let i = 0; i < productsInstances.length; i++) {
      productsLinks.push(getIndividualUrl(req, productsInstances[i], {
        baseUrl: '/shopping/product'
      }));
    }

    const newVendor = {
      ...vendor.dataValues,
      products: productsLinks,
      url: getIndividualUrl(req, vendor)
    };
    return newVendor;
  }));

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      count: req.extra.count,
      pages: req.extra.pages,
      currentPage,
      next,
      prev,
      data: vendors,
    });
};

// GET shopping/vendor/:id
const show = async (req, res) => {
  const vendorInstace = await ShoppingVendor.findByPk(req.params.id);
  
  if (!vendorInstace) {
    res.status(httpCodes.NOT_FOUND)
      .json({
        status: 'err',
        messages: [
          'Vendor not found.',
        ],
      });
    
    return;
  }

  const productsInstances = await vendorInstace.getShoppingProduct();
  const productsLinks = [];
  for (let i = 0; i < productsInstances.length; i++) {
    productsLinks.push(getIndividualUrl(req, productsInstances[i], {
      baseUrl: '/shopping/product'
    }));
  }

  const vendor = {...vendorInstace.dataValues, products: productsLinks};

  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: vendor,
    });
};

// POST shopping/vendor
const store = (req, res) => {
  res.status(httpCodes.CREATED)
    .json({
      status: 'ok',
      data: {
        message: 'Create a vendor',
      },
    });
};

// PUT shopping/vendor/:id
const update = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Update a vendor',
      },
    });
};

// DELETE shopping/vendor/:id
const destroy = (req, res) => {
  res.status(httpCodes.OK)
    .json({
      status: 'ok',
      data: {
        message: 'Delete a vendor',
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
