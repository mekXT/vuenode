var http = require("http");
//引入querystring对字符串进行操作
const qs = require('querystring');
const gddtApiCode = "e118d72bfc138d171e18bed2ab3e7478";
const db =require("./mysqlDB");

//当前位置信息
exports.getCurPosition = (req,res) =>{

    var request = require("request");
    var option = {
        url:"http://restapi.amap.com/v3/geocode/regeo?key="+gddtApiCode+"&location="+req.body.opt.lng + ","+req.body.opt.lat+"&poitype=&radius=100&extensions=base&batch=false&roadlevel=0"
    }

    request.get(option,function(err,response,body){
        //console.info(response.body);
        res.send(response.body);
    })

}

//当前位置的天气信息
exports.getCurWeather = (req,res)=>{
    var request = require("request");
    var option = {
        url:"http://restapi.amap.com/v3/weather/weatherInfo?key="+gddtApiCode+"&city=" + req.body.opt,
    }

    request.get(option,function(err,response,body){
        res.send(response.body);
    })
}

//获取首页商家列表信息
exports.getIndexListData = (req,res)=>{
    db.getIndexListData(req.body.orderby,req.body.dataLength,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//获取所有商家的数量
exports.getTotalShop = (req,res)=>{
    db.getTotalShop((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}
