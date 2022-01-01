const Logger = require("./log"); //导入从log.js文件导出的class
const logger = new Logger(); //创建class类对象实例
logger.on("事件", (thingData) => {
  console.log("捕获到一个事件,这些是此事件发出的参数:", thingData);
}); //设置捕获到事件的响应处理方式;
logger.log("信息"); //抛出一个响应来验证是否正常运行
