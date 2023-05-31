const httpCodes = require('../../constants/httpCodes');
const { ShoppingVendor } = require('../../db/models/index');
const { getNextUrl, getPrevUrl, getIndividualUrl } = require('../../helpers/api');

const VENDORS_PER_PAGE = 10;

// GET shopping/vendor
const index = async (req, res) => {
  const currentPage = req.query.page ? +req.query.page : 1;

  const next = currentPage < req.extra.pages ? getNextUrl(req, currentPage) : null;
  const prev = currentPage > 1 ? getPrevUrl(req, currentPage) : null;

  const vendors = (await ShoppingVendor.findAll({
    limit: VENDORS_PER_PAGE,
    offset: (currentPage - 1) * VENDORS_PER_PAGE,
  })).map(vendor => {
    const newVendor = {...vendor.dataValues, url: getIndividualUrl(req, vendor)};
    return newVendor;
  });

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
  const vendor = await ShoppingVendor.findByPk(req.params.id);

  if (!vendor) {
    res.status(httpCodes.NOT_FOUND)
      .json({
        status: 'err',
        messages: [
          'Vendor not found.',
        ],
      });
    
    return;
  }

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
