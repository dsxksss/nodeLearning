const Logger = require("./log");
const logger = new Logger();
logger.on("事件", (thingData) => {
  console.log("捕获到一个事件,这些是此事件发出的参数:", thingData);
});
logger.log("信息");
