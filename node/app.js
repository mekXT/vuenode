var createError = require('http-errors');
// 创建express服务器
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//用于解析数据
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api/*',function(req,res,next){
    // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin","*");
    // 设置服务器支持的所有头信息字段
  res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods","POST,GET,DELETE,OPTIONS");
    // next()方法表示进入下一个路由
  next();
});

/*//post
app.use(bodyParser.urlencoded({extended: false}));
//处理json格式的参数
app.use(bodyParser.json());*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('4000',function(){
  console.log('running...')

})
