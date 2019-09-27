const db = require("./mysqlDB")

const field = {"id":"id","title":"title","content":"content","date":"date"};

db.getHTData("newNews",field,2,2,(ret)=>{
    console.log("显示失败");
},(ret)=>{
    console.log(ret);
})
