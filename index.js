//方便后期调试的debug库,此地方需要设置环境变量运行,咧:DEBUG=app_debug nodemon index.js;
const debug = require("debug")("app_debug");
const express = require("express"); //导入express框架
const courses = require("./routers/courses");
const config = require("config"); //导入应用配置管理库
// const logger = require("./Middleware/logger"); //导入自定义中间件
const helmet = require("helmet"); //helmet是加强http头安全性的一个中间件
const morgan = require("morgan"); //morgan是一个记录http请求日志的中间件
const api = express(); //创建框架实例

// process.env.NODE_ENV;//node内置显示当前环境配置的,如果没有设置,默认为undefined
// express.get("env");//exoress内置的get函数也可以获取当前系统的环境配置

//Configuration
debug(`MY APP name: ${config.get("name")}`);
debug(`mail host: ${config.get("mail.host")}`);

//创建中间件:中间件是在一个客户端连入之后必须经过的一个过程;
//此中间件的作用是将一个刚连上服务的客户端里的数据转换成req.body的JSON数据供我们使用.
api.use(express.json());
api.use(helmet());
api.use("/api/ventroar/", courses); //表示使用从其他文件导出的路由功能，第一个参数为默认路由path

//检测当前环境是否为开发环境，如果是，则使用morgan日志记录
if (api.get("env") === "development") {
  api.use(morgan("dev")); //tiny是简单的log记录方式,这里使用的是dev记录格式
  debug("development !,morgan starting~");
}

//logger中间件是自己创建的自定义中间件
// api.use(./Middleware/logger);

//static中间件是向网页提供静态数据
/*静态数据是存在与网站根目录到
列：(http://localhost:3000/new.txt)
并非(http://localhost:3000/api/genres/xxx)
*/
// api.use(express.static("public"));

// urlencoded中间件是传递数组或者复杂的网页表单数据，此方法已经很少被使用了
// api.use(express.urlencoded({ extended: true }));

//创建端口监听
const host = process.env.PORT || 3000; //设置动态端口
api.listen(host, () => console.log(`listen to ${host} host ...`));
