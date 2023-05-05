const getNextUrl = (req, currentPage) => {
  const protocol = req.secure ? 'https://' : 'http://';

  return `${protocol}${req.headers.host}${req.baseUrl}?page=${currentPage + 1}`;
};

const getPrevUrl = (req, currentPage) => {
  const protocol = req.secure ? 'https://' : 'http://';

  return `${protocol}${req.headers.host}${req.baseUrl}?page=${currentPage - 1}`;
};

module.exports = {
  getNextUrl,
  getPrevUrl,
};
