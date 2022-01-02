const logger = (req, res, next) => {
  console.log("登入验证中...");
  next();
  return;
};

module.exports = logger;
