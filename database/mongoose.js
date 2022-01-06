const { all } = require("express/lib/application");
const mg = require("mongoose");

//SM:连接MongoDBdataBase数据库
mg.connect("mongodb://localhost/ventroar")
  .then(() => console.log("Connect DataBase......  OK"))
  .catch((err) => {
    console.log(`Could not connect to dataBase [ ${err} ] !!!`);
  });
//定义标准存入数据类型格式
const courseSchema = new mg.Schema({
  name: String,
  author: String,
  tage: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

/*
        SM:[----------Schema模型的创建--------]
    参1:目标集合的单数模型名称,参2:这个集合所需要的Schema
    这个model的返回值是返回一个类,后面可以用这个单数模型去定义一个实例
*/
const Course = mg.model("Course", courseSchema); //生成模版类

//FUNCTION:创建数据并存入数据库
//创建数据函数，因为内部需要执行异步操作，所以加上async关键字
const createCourse = async () => {
  //创建用某个Schema模型类生成的实例,后面要将这个实例Obj保存到数据库里去
  const course = new Course({
    name: "zhanghaining",
    author: "253570",
    tage: ["react", "typeScript"],
    isPublished: true,
  });
  //save()函数是将调用它的对象存入到数据库里，因为存入数据库需要时间，所以用了异步操作
  const result = await course.save();
  console.log(`${result} \n this data all save in database done.`);
};

//FUNCTION:查询数据库数据并获得
const getCourse = async () => {
  //记得加await关键字
  /*
  find查找数据,参接受一个对象,对象里的内容可以过滤数据.
  limit表示只返回固定数据量
  sort排序,参接受一个对象,对象内容可以是name:1 or name:-1,正数表示升序,负数表示降序.
  select只返回对象的某些数据,参接受一个对象,对象内容可以是name:1,tage:1.正数表示确认
  */
  const allData = await Course.find({
    name: "zhanghaining",
    isPublished: true,
  })
    .limit(1)
    .sort({ name: 1 })
    .select({ name: 1, tage: 1 });
  console.log("allData", allData);
};

getCourse();
