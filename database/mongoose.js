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
const Course = mg.model("Course", courseSchema);
//创建用某个Schema模型类生成的实例,后面要将这个实例Obj保存到数据库里去
const course = new Course({
  name: "dsxk",
  author: "zhang_xiao_kang",
  tage: ["node", "typeScript"],
  isPublished: true,
});
