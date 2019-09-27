var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vueNode";
var maxData = 0;

//获取轮播所有数据的条数
function getTotalData(){
    var promise = new Promise(function(resolve,reject){
        console.time("花费了1");
        MongoClient.connect(url,{useNewUrlParser:true},function(err,db){

            console.timeEnd("花费了1");
            if(err) throw err;
            var dbase = db.db("vueNode");
            dbase.collection("data").find({"type":"lunbo"}).count(function(err,result){
                if(err) throw err;
                resolve(result);
                db.close();
            })
        })
    });
    return promise;
}

//分页获取轮播的数据
function getPageLunbo(curpage,totalData,callback1,callback2){
    var promise = new Promise(function(resolve,reject){
        console.time("花费了2");
        MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
            console.timeEnd("花费了2");
            if(err) throw err;
            var dbase = db.db("vueNode");
            var skipNum = (curpage-1)*5;
            dbase.collection("data").find({"type":"lunbo"},{"projection":{"id":1,"date":1,"title":1,"content":1,"_id":0}}).skip(skipNum).limit(5).toArray(function(err,res){
                if(err) throw err;
                var dataArray = {
                    "count":totalData,
                    "data":res
                }
                resolve(dataArray);
                db.close();
            })
        })
    });
    return promise;
}

//创建账号
exports.uInsert = function(username,password,callback1,callback2){
    MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
        if(err)  throw  err;
        console.log("此数据库已连接");
        var dbo = db.db("vueNode");
        var myobj = [
            {username:username,password:password},
        ]
        dbo.collection("site").insertMany(myobj,function(err,res){
            if(err) return callback1();
            return callback2();
            db.close();
        })
    })

}

//删除所选行的数据（批量删除之后再加）
exports.uDelete = function(id,callback1,callback2){
    MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        console.log("数据库已连接");
        var dbase = db.db("vueNode");
        var whereStr = {"id":id};
        dbase.collection("data").deleteOne(whereStr,function(err,res){
            if(err) throw err;
            const resData = {status:1};
            console.log(resData);
            callback2(resData);
            db.close();
        })
    })
}

//登录账号
exports.uSelect = function(username,password,callback1,callback2){
    MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbase = db.db("vueNode");
        var whereStr = {"username":username,"password":password};
        dbase.collection("site").find(whereStr).toArray(function(err,res){
            if(err) throw err;
            if(res.length == 0)  return callback1();
             return callback2(res);
        });
    })

}

exports.uUpdate = function(){
    MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        console.log("数据库已连接");
        var dbase = db.db("vueNode");
        var whereStr = {"username":"admin"};
        var updateStr = {$set:{"password":"newadmin"}};
        dbase.collection("site").updateOne(whereStr,updateStr,function(err,res){
            if(err) throw err;
            db.close();
        },function(){
            return "数据更新成功"
        })
    })
}

//获取首页轮播数据
exports.getLunboData = function(curPage,callback1,callback2){
    getTotalData()
        .then(function(data){
            return getPageLunbo(curPage,data,callback1,callback2);
        })
        .then(function(data){
            return callback2(data);
        })

};

//获取首页最新消息处的新闻
exports.getNewNews = function(callback1,callback2){
    MongoClient.connect(url,"useNewUrlParser:true",function(err,db){
        if(err) throw err;
        var dbase = db.db("vueNode");
        dbase.collection("data").find({"type":"lunbo"},{"projection":{"title":1,"_id":0}}).limit(4).toArray(function(err,res){
            if(err) throw err;
            console.log(res);
            var newData = [];
            for(var i=0;i<res.length;i++)
            {
                newData[i] = {"orderBy": i+1,"title":res[i].title}
            }
            console.log(newData);
            return callback2(newData)
        })
    })
}

//后台添加新闻
exports.addData= function(params,callback1,callback2){
    MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbase = db.db("vueNode");
        var myobj = [];
        console.log(params)
        myobj.push(params);
        console.log(myobj);
        dbase.collection("data").insertMany(myobj,function(err,res){
            if(err) return callback1();
            return callback2();
            db.close();
        });
    })
}





