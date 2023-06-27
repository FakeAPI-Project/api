const getProtocol = (req) => req.secure ? 'https://' : 'http://';

const getNextUrl = (req, currentPage) => `${getProtocol(req)}${req.headers.host}${req.baseUrl}?page=${currentPage + 1}`;

const getPrevUrl = (req, currentPage) => `${getProtocol(req)}${req.headers.host}${req.baseUrl}?page=${currentPage - 1}`;

const getIndividualUrl = (req, modelInstance, override = {}) => {
  const host = override.host ? override.host : req.headers.host;
  const baseUrl = override.baseUrl ? override.baseUrl : req.baseUrl;

  return `${getProtocol(req)}${host}${baseUrl}/${modelInstance.id}`;
};

module.exports = {
  getIndividualUrl,
  getNextUrl,
  getPrevUrl,
};
