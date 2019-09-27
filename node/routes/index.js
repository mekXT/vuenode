var express = require('express');
//引入fs插件读取文件进行操作
var fs = require("fs");
//引入multer插件传图片 中间件
var multer = require('multer');
var router = express.Router();
const services = require('../services.js');
const showservices = require('../showservices.js')

//创建一个存放图片的目录
const upload = multer({dest:__dirname + "/../public/images/upload/"});

//上传图片的接口
router.post('/api/upload',upload.single('file'),async(req,res)=>{
    //获取文件
    const file = req.file;
    //获取文件后缀
    const oFileName = file.originalname.split(".")[1];
    //重命名该文件并加上后缀
    fs.renameSync(file.path,file.path + '.' + oFileName)
    //拼凑带后缀名的url传到前台
    file.url = 'http://localhost:4000/images/upload/' + file.filename + "." + oFileName;
    console.log();
    res.send(file);
});

router.get("/uploads",function(req,res){

})

/*/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

//登录路由
router.post('/api/login',services.login);
//注册路由
router.post('/api/register',services.register);
//后台数据获取路由
router.post('/api/getHTData',services.getHTData);
//后台数据删除路由
router.post('/api/delHTData',services.delHTData);
//后台数据添加路由
router.post('/api/addHTData',services.addHTData);
//后台更新数据路由
router.post('/api/updateHTData',services.updateHTData);
//后台搜索数据路由
router.post('/api/findSearchData',services.findSearchData);


//前台最新数据显示路由
router.post('/api/showQTNewNewsData',services.showQTNewNewsData);
//前台精选数据显示路由
router.post('/api/showQTHotNewsData',services.showQTHotNewsData);
//前台获取轮播数据路由
router.post('/api/showLunboNewsData',services.showLunboNewsData);
//前台获取文章数据路由
router.post('/api/getArticle',services.getArticle);
//前台获取个人属性的路由
router.post('/api/getPersonData',services.getPersonData);
//前台文章页设置点击数路由
router.post('/api/setArticlePoint',services.setArticlePoint);
//前台列表页获取新闻路由
router.post('/api/setArticleList',services.setArticleList);
//前台模糊查询路由
router.post('/api/getSearchArticle',services.getSearchArticle);



//前台echart表格数据获取
router.post('/api/getEchartData',services.getEchartData);
//前台echart获取时间对应点击数的数据获取
router.post('/api/getTimePoint',services.getTimePoint);

/*router.post('/api/lbdata',services.lbdata);
router.post('/api/showNewNews',showservices.showNewNews);
router.post('/api/delData',services.delData);
router.post('/api/isID',services.isID);
router.post('/api/addData',services.addData);*/



module.exports = router;
