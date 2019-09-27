
const db = require('./mgdb');

exports.showNewNews = (req,res)=>{
    db.getNewNews((ret)=>{
        res("获取失败")
    },(ret)=>{
        res.send(ret)
    })
}
