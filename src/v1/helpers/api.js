const getProtocol = (req) => req.secure ? 'https://' : 'http://';

const getNextUrl = (req, currentPage) => `${getProtocol(req)}${req.headers.host}${req.baseUrl}?page=${currentPage + 1}`;

const getPrevUrl = (req, currentPage) => `${getProtocol(req)}${req.headers.host}${req.baseUrl}?page=${currentPage - 1}`;

const getIndividualUrl = (req, modelInstance) => `${getProtocol(req)}${req.headers.host}${req.baseUrl}/${modelInstance.id}`;

module.exports = {
  getIndividualUrl,
  getNextUrl,
  getPrevUrl,
};
