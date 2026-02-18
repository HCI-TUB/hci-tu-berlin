const languageMiddleware = (req, res, next) => {
  const lang =
    req.headers["accept-language"] ||
    req.query.lang ||
    "en";

  req.lang = lang.substring(0, 2);
  next();
};

module.exports = { languageMiddleware };