const express = require("express");
const router = express.Router();
const Joi = require("joi"); //导入数据验证库

const routerPathName = "/";

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
router.get(routerPathName, (_req, res) => {
  if (!userData)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  res.send(userData);
});
router.get(`${routerPathName}:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  res.send(ByTrue);
});

//POST
router.post(routerPathName, (req, res) => {
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
router.put(`${routerPathName}:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  ByTrue.name = "new Name~";
  res.send(ByTrue);
});

//DELETE
router.delete(`${routerPathName}:id`, (req, res) => {
  const ByTrue = userData.find((c) => c.id === parseInt(req.params.id));
  //404
  if (!ByTrue)
    return res.status(404).send(`<h1>erreo! NotFund This Data!!!</h1>`);
  const index = userData.indexOf(ByTrue);
  userData.splice(index, 1);
  res.send(ByTrue);
});

module.exports = router;
