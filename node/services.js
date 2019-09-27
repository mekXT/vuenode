
//const db = require("./mgdb");
const db = require("./mysqlDB");

//登录
exports.login = (req,res) =>{
    /*let sql = 'select * from xtuser where username = ? and password = ?';
    let data = [req.body.username,req.body.password];
    db.base(sql,data,(ret)=>{
        console.log("111");
    })*/
    db.login(req.body.username,req.body.password,(ret)=>{
        res.send("登录失败");
    },(ret)=>{
        res.send("登录成功");
    });
}

//注册
exports.register = (req,res)=>{
    db.register(req.body.username,req.body.password,(ret)=>{
        res.send("注册失败");
    },(ret)=>{
        res.send("注册成功");
    });

}

//后台获取数据
exports.getHTData = (req,res)=>{

    var field = {"id":"id","title":"title","content":"content","date":"date"};

    db.getHTData("newNews",field,req.body.curPage,5,(ret)=>{
        res.send("err");
    },(ret)=>{
        res.send(ret)
    })
}

//后台删除所选行数据
exports.delHTData = (req,res)=>{
    db.delHTData(req.body.id,(ret)=>{
        res.send("err");
    },(ret)=>{
        res.send(ret);
    });
}

//后台添加数据
exports.addHTData = (req,res)=>{
    db.addHTData(req.body,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//后台更新数据
exports.updateHTData = (req,res)=>{
    db.updateHTData(req.body,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//后台查询数据
exports.findSearchData = (req,res)=>{
    db.findSearchData(req.body.id,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}




//前台最新消息数据显示
exports.showQTNewNewsData = (req,res)=>{
    db.showQTNewNewsData((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台精选数据显示
exports.showQTHotNewsData = (req,res)=>{
    db.showQTHotNewsData((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台轮播数据显示
exports.showLunboNewsData = (req,res)=>{
    db.showLunboNewsData((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台文章数据显示
exports.getArticle = (req,res)=>{
    db.getArticle(req.body.id,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台个人属性获取
exports.getPersonData = (req,res)=>{
    db.getPersonData((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台设置文章点击数
exports.setArticlePoint = (req,res)=>{
    db.setArticlePoint(req.body.id,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret)
    })
}

//前台列表页获取新闻
exports.setArticleList = (req,res)=>{
    db.setArticleList(req.body.type,req.body.curPage,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台模糊查询
exports.getSearchArticle = (req,res)=>{
    db.getSearchArticle(req.body.keyword,req.body.curPage,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}




//前台echarts表格数据获取
exports.getEchartData = (req,res)=>{
    db.getEchartData(req.body.params,(ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}

//前台echarts获取时间对应点击数
exports.getTimePoint = (req,res)=>{
    db.getTimePoint((ret)=>{
        res.send(ret);
    },(ret)=>{
        res.send(ret);
    })
}
