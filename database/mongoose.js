const { all } = require("express/lib/application");
const mg = require("mongoose");

//SM:连接MongoDBdataBase数据库
mg.connect("mongodb://localhost/ventroar") //连接到此数据文档,如果没有默认则会创建
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

// createCourse()

/*
SM:MongoDB查询符:
eq:等于
neq:不等于
gt:大于
gte:大于等于
lt:小于
lte:小于等于
in:存在
nin:不存在
使用方法：
find({价钱:{$gt:10}})//找出价钱大于10的数据.
find({价钱:{$gt:10,$lt:20}})//找出价钱大于10,但小于20的数据.
find({价钱:{$in:[10,15,20]})//只找出价钱有10,15,20的数据.

SM:Mongoose库逻辑操作
or:逻辑或(||)
and:逻辑与(&&)
使用方法：
.or([{name:"dsxk"},{isPublished:true}])//有其中一项就返回
.and([{name:"dsxk"},{isPublished:true}])//全部都含有就返回

SM:MongoDB正则表达式
--------------[双斜杠内的东西表示正则表达式]---------
例子1:以dsxk字符开头
find({name:/^dsxk/})
例子2:以dsxk字符结尾
find({name:/dsxk$/})
例子3:以dsxk字符结尾,其字符大小写不敏感
find({name:/dsxk$/i})//默认会对字符大小写敏感,在第二个斜杠后加上i表示字符大小写不敏感
例子3:含有dsxk字符,这段字符前后可以含有其他文字
find({name: / .*dsxk.* / })//.*表示在此字符串 前面或后面 可以有或者没有字符
*/
//FUNCTION:查询数据库数据并获得
const getCourse = async () => {
  //记得加await关键字
  /* 
  SM:Mongoose库基本搜索函数说明
  find查找数据,参接受一个对象,对象里的内容可以过滤数据.
  limit表示只返回固定数据数量
  sort排序,参接受一个对象,对象内容可以是{name:1} or {name:-1},正数表示升序,负数表示降序.
  相同也可以用 'name' or '-name' 来表示升序和降序
  select只返回对象的某些数据,参接受一个对象,对象内容可以是name:1,tage:1.正数表示确认
  count只返回符合搜索要求的数据数量
  skip查询分页操作
  */
  const pageNumber = 2;
  const pageSize = 10;

  const Data = await Course.find({
    name: "zhanghaining",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize) //这里我声明的页码是从1开始的,页码不代表页的序列.
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tage: 1 });
  console.log("allData", Data);
};

//getCourse();

//FUNCTION:更新数据库里某个文档数据
const updata = async (id) => {
  //SM:更新操作有两种方法:
  //方法1、先查再改((需要发送多次数据))
  //findById会找到原来的表，此次更新并非创建一个新数据然后删除旧数据
  const Data = await Course.findById(id);
  if (!Data) return; //如果没找到此数据id，则终止运行
  //修改数据部分代码(非实际情况)
  //SM:可以利用set函数方法简便实现下面两行代码
  // Data.name = "xxxxxxxxxxxxxxxxx";
  // Data.isPublished = false;
  Data.set({
    name: "xxxxxxxx",
    isPublished: false,
  });
  const result = await Data.save();
  console.log(`${result} \n this data updata done.`);

  /*方法2、只想修改或增加数据,不需要验证数据(只需要发送一次数据)
  ------------------SM:只更新对应id的数据--------------
  以下操作使用了mongoDB的部分运算符
  参1:查询或者过滤,参2:要更新的数据
    const result = await Course.updata({_id:id},{
      $set:{
        name: "xxxxxxxx",
        isPublished: false,
      }
    });
    console.log(`${result});
  */

  /*也可以利用findByIdAndUpdata,获得之更新对应id数据前或数据后的内容(只需要发送一次数据)
  参1:查询或者过滤,参2:要更新的数据,
  参3:是否返回 更新前 或 更新后的数据,new默认为false数据返回为更新前,修改为true则为更新后
  const result = await Course.findByIdAndUpdata(id,{
      $set:{
        name: "xxxxxxxx",
        isPublished: false,
      },{new:true}
    });
    console.log(`${result});
  */
};

// updata("61d68f38251ba306d78abaf6");
