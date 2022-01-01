const EventEmitter = require("events"); //导入事件处理的node自带模块

const url = "http://www.ventroar.xyz"; //随便设置的一些参数
class Logger extends EventEmitter {
  //将Logger类继承自EventEmitter事件处理类
  log(msg) {
    console.log(`this msg is ${msg}`);
    this.emit("事件", { id: 1, url: url }); //发起一个事件及传出一些参数,这里传出了一个Obj;
  }
}

module.exports = Logger; //导出模块供其他地方使用;这里导出的是一个class
