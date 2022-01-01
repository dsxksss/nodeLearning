const EventEmitter = require("events");

const url = "http://www.ventroar.xyz";
class Logger extends EventEmitter {
  log(msg) {
    console.log(`this msg is ${msg}`);
    this.emit("事件", { id: 1, url: url });
  }
}

module.exports = Logger; //导出模块供其他地方使用;这里导出的是一个class
