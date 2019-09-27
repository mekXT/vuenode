const moment = require("moment")

var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"vuenode",
    multipleStatements:true
});

//mysql数据库的登录模块
exports.login = function(username,password,callback1,callback2){
    var sql = "select password from user where username = ?";
    connection.query(sql,username,function(err,result){
        //账号错误
        if(err || result.length == 0)
        {
            return callback1;
        }
        if(result[0].password == password)
        {
            return callback2();
        }
        //密码错误
        else {
            return callback1;
        }
    })
}

//mysql数据库的注册模块
exports.register = function(username,password,callback1,callback2){
    var sql = "select * from user where username = ?";
    connection.query(sql,username,function(err,result){
        if(err) throw err;
        //查询是否存在这条数据
        if(result.length != 0 )
        {
            callback1();
            return callback1;
        }
        else{
            var sql2 = "insert into user(username,password) values(?,?)";
            var params2 = [username,password];
            connection.query(sql2,params2,function(err,result){
                if(err) throw err;
                //是否插入数据成功
                if(result.affectedRows == 1)
                {
                    callback2();
                    return callback2;
                }
                else
                {
                    callback1();
                    return callback1;
                }
            })
        }
    })

}

//mysql数据库的后台获取数据展示代码
exports.getHTData = function(type,field,currentPage,perPageCount,callback1,callback2){

    //获取所有数据的总条数和页数
    var url2 = "select count(*) as count from vuedata";
    connection.query(url2,function(err,result){
        if(err) throw err;
        var totalCount = result[0].count;
        var maxPage = Math.ceil(totalCount/perPageCount);

        //获取当前页的数据
        var newType = type;
        //var newField = field.id + "," + field.title + "," +field.content + "," + field.date;
        var newCurrentPage = parseInt(currentPage);
        var newPerPageCount = parseInt(perPageCount);

        //var sql = "select " + newField +" from vuedata where type = ? limit " + (newCurrentPage-1)*5 + " , " + newPerPageCount;
        var sql = "select * from vuedata limit " + (newCurrentPage-1)*5 + " , " + newPerPageCount;

        connection.query(sql,function(err,result){
            if(err) throw err;

            if(result.length == 0)
            {
                return callback1;
            }

            for(var i=0;i<result.length;i++){
                result[i].date = moment(result[i].date).format('YYYY-MM-DD HH:MM:SS');
            }

            var res = {"totalCount":totalCount,"maxPage":maxPage,"data":result};

            //console.log(res);//res为返回的总数据 包含总数据 总页数 查询的分页数据
            return callback2(res);

        })

    })

}

//mysql数据库的后台删除数据代码
exports.delHTData = function(id,callback1,callback2){
    var sql = "delete from vuedata where id = " + parseInt(id);
    connection.query(sql,function(err,result){
        if(err) throw err;
        if(result.affectedRows != 0)
        {
            var res = {"status":"1"};
            return callback2(res);
        }
        else {
            return callback1;
        }
    })
}

//mysql数据库的后台添加数据代码
exports.addHTData = function(params,callback1,callback2){
    params.date = moment(params.date).format("YYYY-MM-DD HH:MM:SS");
    var sql = "insert into vuedata set title = ? , content = ? , date = ? , type = ? , author = ? , suoluetu = ?";
    var newParams = [params.title,params.content,params.date,params.type,params.author,params.imagesSrc];
    connection.query(sql,newParams,function(err,result){
        if(err) throw err;
        if(result.affectedRows != 0){
            return callback2("添加成功");
        }
        else {
            return callback1("添加失败");
        }
    })
}

//mysql数据库的后台更新数据代码
exports.updateHTData = function(params,callback1,callback2){
    console.log(params);
    var sql = "update vuedata set title = ?,content = ?,date = ?,type = ?,author = ? where id = ?";

    var newParams = [params.title,params.content,moment(params.date).format("YYYY-MM-DD HH:MM:SS"),params.type,params.author,params.id];

    connection.query(sql,newParams,function(err,result){
        if(err) throw err;
        if(result.affectedRows != 0)
        {
            return callback2("更新成功");
        }
        else {
            return callback1("更新失败");
        }
    })
}

//mysql数据库后台搜索功能代码
exports.findSearchData = function(id,callback1,callback2){
    var sql = "select * from vuedata where id = ?";
    var params = [id];
    connection.query(sql,params,function(err,result){
        if(err) throw err;
        console.log(result.length)
        if(result.length == 0)
        {
            var res = {"isGet":false}
            callback1(res);
        }
        else
        {
            var res = {"isGet":true,"id":id,"title":result[0].title,"content":result[0].content,"date":moment(result[0].date).format("YYYY-MM-DD HH:MM:SS"),"type":result[0].type,"author":result[0].author}
            callback2(res);
        }
    })
}





//前台获取最新信息处的数据
exports.showQTNewNewsData = function(callback1,callback2){
    var sql = "select id,title from vuedata order by date desc limit 0,4";
    connection.query(sql,function(err,result){
        if(err) throw err;
        var newRes = [];
        for(var i=0;i<result.length;i++)
        {
            newRes[i] = {"orderBy":i+1,"title":result[i].title,"id":result[i].id}
        }
        return callback2(newRes);
    })
}

//前台获取精选数据的数据
exports.showQTHotNewsData = function(callback1,callback2){
    var sql = "select id,title,content,author,date,point from vuedata order by id desc limit 0,5";
    connection.query(sql,function(err,result){
        if(err) throw err;
        var newRes = [];
        for(var i=0;i<result.length;i++){
            newRes[i]={"id":result[i].id,"title":result[i].title,"content":result[i].content,"author":result[i].author,"date":moment(result[i].date).format("YYYY-MM-DD HH:MM:SS"),"point":result[i].point};
        }
        return callback2(newRes);
    })
}

//前台轮播数据的数据
exports.showLunboNewsData = function(callback1,callback2){
    var sql = "select id,suoluetu from vuedata where suoluetu != '' order by date desc limit 0,4";
    connection.query(sql,function(err,result){
        if(err) throw err;
        return callback2(result);
    })
}

//前台获取文章详情的数据
exports.getArticle = function(id,callback1,callback2){
    var sql = "select title,content,date,author from vuedata where id = ?";
    connection.query(sql,id,function(err,result){
        if(err) throw err;
        if(result.length != 0){
            result[0].date = moment(result[0].date).format("YYYY-MM-DD HH:MM:SS");
            callback2(result[0])
        }
        else{
            callback1("文章没有获取到")
        }
    })
}

//前台获取个人属性方法 使用promise方法 两次回调后一次给前台传值
exports.getPersonData = function(callback1,callback2){
    getNewsCount().then(function(data){
        getViewCount().then(function(data1){
            data1.articleCount = data;
            if(data1 != {})
            {
                callback2(data1);
            }
            else {
                callback1("查询失败");
            }
        })
    })
}

//前台获取新闻总数并给person表中新闻统计字段赋值
function getNewsCount(){
    const cb = new Promise(function(resolve, reject){
        const sql = "select count(*) as count from vuedata";
        connection.query(sql,function(err,result){
            if(err) throw err;
            const newCount = result[0].count;
            const sql2 = "update person set articlecount = ? where belong = 'xietao'";
            connection.query(sql2,newCount,function(err,result){
                if(err) throw err;
                if(result.affectedRows == 1)
                {
                    resolve(newCount);
                }
            })
        })
    })
    return cb;
}

//前台每次实例化时使person表中统计点击数字段赋值以及获取昵称
function getViewCount(){
    const cb = new Promise(function(resolt,reject){
        const sql = "update person set pageviews = pageviews + 1";
        connection.query(sql,function(err,result){
            if(err) throw err;
            if(result.affectedRows == 1)
            {
                const sql2 = "select nickname,pageviews from person where belong = 'xietao'"
                connection.query(sql2,function(err,result){
                    if(err) throw err;
                    resolt(result[0]);
                })
            }
        })
    })
    return cb;
}

//前台文章页设置点击数
exports.setArticlePoint = function(id,callback1,callback2){
    //设置点击数+1
    const sql = "update vuedata set point = point + 1 where id = ?";
    connection.query(sql,id,function(err,result){
        if(err) throw err;
        if(result.affectedRows == 1)
        {
            //获取该点击数
            const sql2 = "select point from vuedata where id = ?";
            connection.query(sql2,id,function(err,result){
                if(err) throw err;
                console.log(result[0].point);
                //该返回值不能为一个纯数字 会报错 可转为字符串或者返回一个对象
                callback2(result[0].point.toString());
            })
        }
    })
}

//前台列表页获取新闻
exports.setArticleList = function(type,curPage,callback1,callback2){

    var sql1 = "select count(*) as count from vuedata where type = ?";
    connection.query(sql1,type,function(err,result){
        if(err) throw err;
        const totalData = result[0].count;

        const maxPage = Math.ceil(totalData/20);
        const currentPage = parseInt(curPage);

        const sql2 = "select * from vuedata where type = ? limit " + (currentPage-1)*20 + " , 20";

        connection.query(sql2,type,function(err,result){
            if(err) throw err;

            for(var i=0;i<result.length;i++)
            {
                result[i].date = moment(result[i].date).format('YYYY-MM-DD');
            }

            const res = {
                data:result,
                maxPage:maxPage
            }

            callback2(res);

        })

    })


}

//前台模糊查询
exports.getSearchArticle = function(keyword,curPage,callback1,callback2){
    var sql = "select id from vuedata where LOCATE(?,title)";
    connection.query(sql,keyword,function(err,result){
        if(err) throw err;

        const totalData = result.length;
        const maxPage = Math.ceil(totalData/20);
        const currentPage = parseInt(curPage);

        var str = "";
        for(var i=0;i<result.length;i++){
            if(i == result.length - 1)
            {
                str = str + result[i].id;
            }
            else
            {
                str = str + result[i].id + ",";
            }
        }

        const sql2 = "select id,type,title,date from vuedata where id in (" + str + ") limit " + (currentPage-1)*20 + ",20";

        connection.query(sql2,function(err,result){
            if(err) throw err;

            for(var j=0;j<result.length;j++){
                result[j].date = moment(result[j].date).format('YYYY-MM-DD');
            }

            const res = {
                data:result,
                maxPage:maxPage
            }

            callback2(res);

        })
    })
}




//前台echarts表格数据获取
exports.getEchartData = function(params,callback1,callback2){
    var sql = "";

    for(var i =0;i<params.length;i++){
        sql += "select count(*) as count from vuedata where type = '" + params[i] + "';";
    }

    connection.query(sql,function(err,result){
        if(err) throw err;
        callback2(result);
    })

}

//前台echart获取时间对应点击数
exports.getTimePoint = function(callback1,callback2){

    var sql = "select pageviews from person";
    connection.query(sql,function(err,result){
        if(err) throw err;

        var nowDate = new Date();
        var month = (nowDate.getMonth()+1);
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        var date = nowDate.getDate();
        if (date >= 0 && date <= 9) {
            date = "0" + date;
        }
        var newDate = nowDate.getFullYear() + "/" + month + "/" + date + " " + nowDate.toLocaleTimeString();

        var newParams = [newDate,result[0].pageviews];
        console.log(newParams);

        var sql1 = "insert into timepoint set ntime = ? , npoint = ?";
        connection.query(sql1,newParams,function(err,result){
            if(err) throw err;
            if(result.affectedRows != 0){
                var sql2 = "select * from timepoint ORDER BY ntime desc limit 0,3";
                connection.query(sql2,function(err,result){
                    if(err) throw err;
                    callback2(result);
                })
            }
        })

    })

}
