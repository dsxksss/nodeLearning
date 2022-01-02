const express = require("express"); //导入express轻量级框架
const Joi = require("joi"); //导入处理数据验证的joi库

const setApi = express(); //创建fucntion实例
setApi.use(express.json()); //中间件

//FUNCTION:封装的数据验证函数
const dataByTrue = (data) => {
  //定义标准数据
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  //返回验证结果
  return schema.validate(data);
};

let userData = [
  { id: 1, name: "Jack1", age: 18 },
  { id: 2, name: "Jack2", age: 20 },
  { id: 3, name: "Jack3", age: 22 },
];

//get部分:
//获取整个数据
//req:获取的对方数据,res:服务端的响应反馈
setApi.get("/api/userData", (_req, res) => {
  res.send(userData);
});

//获取单个数据
//parseInt()函数是将一个字符串转换成int类型整数
setApi.get("/api/userData/:id", (req, res) => {
  //查找对应内容并返回找到的数据
  const ByOnData = userData.find((c) => c.id === parseInt(req.params.id));
  //如果不存在对应内容的话，向客户端发送一个404错误状态码，并提示不存在此数据
  if (!ByOnData)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);

  res.send(ByOnData);
});

//post部分:
setApi.post("/api/userData", (req, res) => {
  //数据验证
  const { error } = dataByTrue(req.body);
  //如果数据验证出现错误就返回400状态码,并说明具体问题
  if (error) return res.status(400).send(error.details[0].message);

  //假数据的存入操作
  const oneData = {
    id: userData.length + 1,
    name: req.body.name,
    age: userData.length + 10,
  };
  userData.push(oneData);
  res.send(oneData);
});

//put部分:
setApi.put("/api/userData/:id", (req, res) => {
  //查找用户要更新的具体数据
  const ByOnData = userData.find((c) => c.id === parseInt(req.params.id));
  //如果不存在对应内容的话，向客户端发送一个404错误状态码，并提示不存在此数据
  if (!ByOnData)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);

  //数据验证
  const { error } = dataByTrue(req.body);
  //如果数据验证出现错误就返回400状态码,并说明具体问题
  if (error) return res.status(400).send(error.details[0].message);
  //更新数据的操作
  ByOnData.name = req.body.name;
  res.send(ByOnData); //返回修改好的数据给客户端
});

//delete部分:
setApi.delete("/api/userData/:id", (req, res) => {
  //查找用户要删除的具体数据
  const ByOnData = userData.find((c) => c.id === parseInt(req.params.id));
  //如果不存在对应内容的话，向客户端发送一个404错误状态码，并提示不存在此数据
  if (!ByOnData)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);

  //查找对应数据库里的索引
  const index = userData.indexOf(ByOnData);
  //删除此数据
  userData.splice(index, 1);

  //向客户端说明已删除的数据
  res.send(ByOnData);
});

//创建端口监听
const host = process.env.PORT || 3000; //设置动态端口
setApi.listen(host, () => console.log(`listen to ${host} host ...`));
