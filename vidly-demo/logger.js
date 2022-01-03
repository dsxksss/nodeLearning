const logger = (_req, _res, next) => {
  console.log(`客户端连接`);
  next(); //必须要有next()函数结尾，不然服务回被阻塞到这里
};

module.exports = logger;
