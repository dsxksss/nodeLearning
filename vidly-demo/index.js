const express = require("express"); //导入express框架
const logger = require("./logger");
const Joi = require("joi"); //导入数据验证库
const api = express(); //创建框架实例

//创建中间件:中间件是在一个客户端连入之后必须经过的一个过程;
//此中间件的作用是将一个刚连上服务的客户端里的数据转换成req.body的JSON数据供我们使用.
api.use(express.json());

//logger中间件是自己创建的自定义中间件
api.use(logger);

//static中间件是向网页提供静态数据
/*静态数据是存在与网站根目录到
列：(http://localhost:3000/new.txt)
并非(http://localhost:3000/api/genres/xxx)
*/
// api.use(express.static("public"));

// urlencoded中间件是读取网页传来的数据，此方法已经很少被使用了
// api.use(express.urlencoded({ extended: true }));

const routerName = "/api/genres";

let userData = [
  { id: 1, name: "Jack1", age: 18 },
  { id: 2, name: "Jack2", age: 20 },
  { id: 3, name: "Jack3", age: 22 },
  { id: 4, name: "Jack4", age: 24 },
  { id: 5, name: "Jack5", age: 26 },
];

//FUNCTION:封装的数据验证函数
const dataByTrue = (data) => {
  //定义标准数据
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  //返回验证结果
  return schema.validate(data);
};

//GET
api.get(routerName, (_req, res) => {
  if (!userData)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  res.send(userData);
});
api.get(`${routerName}/:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  res.send(ByTrue);
});

//POST
api.post(routerName, (req, res) => {
  const { error } = dataByTrue(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const createData = {
    id: userData.length + 1,
    name: req.body.name,
    age: userData.length + 10,
  };
  userData.push(createData);
  res.send(createData);
});

//PUT
api.put(`${routerName}/:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  ByTrue.name = "new Name~";
  res.send(ByTrue);
});

//DELETE
api.delete(`${routerName}/:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  const index = userData.indexOf(ByTrue);
  userData.splice(index, 1);
  res.send(ByTrue);
});
//创建端口监听
const host = process.env.PORT || 3000; //设置动态端口
api.listen(host, () => console.log(`listen to ${host} host ...`));
