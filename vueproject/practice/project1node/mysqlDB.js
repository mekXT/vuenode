//引入时间格式化moment
const moment =require("moment");
//引入mysql数据库mysql
const mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"eleme",
    multipleStatements:true
})

exports.getIndexListData = function(orderby,dataLength,callback1,callback2){
    var sql ="select * from shop order by ? desc limit 0,?";
    var params = ["shopsellnum",dataLength]
    connection.query(sql,params,function(err,result){
    callback1(result);
    })
}

exports.getTotalShop =function(callback1,callback2){
    var sql = "select count(*) as count from shop";
    connection.query(sql,function(err,result){
        var resData = {
            resData : result[0].count
        }
        callback1(resData);
    })
}
