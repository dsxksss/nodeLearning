const express = require("express"); //导入express轻量级框架

const setApi = express(); //创建fucntion实例
setApi.use(express.json()); //中间件

let userData = [
  { id: 1, name: "Jack1", age: 18 },
  { id: 2, name: "Jack2", age: 20 },
  { id: 3, name: "Jack3", age: 22 },
];

//get部分:
//获取整个数据
//req:获取的对方数据,res:服务端的响应反馈
setApi.get("/api/userData", (req, res) => {
  res.send(userData);
});

//获取单个数据
//parseInt()函数是将一个字符串转换成int类型整数
setApi.get("/api/userData/:id", (req, res) => {
  //查找对应内容并返回找到的数据
  const ByOneData = userData.find((c) => c.id === parseInt(req.params.id));
  //如果不存在对应内容的话，向客户端发送一个404错误状态码，并提示不存在此数据
  if (!ByOneData) res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  res.send(ByOneData);
});

//post部分:
setApi.post("/api/userData", (req, res) => {
  const oneData = {
    id: userData.length + 1,
    name: req.body.name,
    age: userData.length + 10,
  };
  userData.push(oneData);
  res.send(oneData);
});

//创建端口监听
const host = process.env.PORT || 3000; //设置动态端口
setApi.listen(host, () => console.log(`listen to ${host} host ...`));
