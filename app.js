var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users  = require('./routes/users');
var fileUtil = require('./utils/fileUtil');
var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'views')))
app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html'); 
app.use('/public/',express.static(path.join(__dirname, 'public')))

/* // 读取树形结构的示例
var pathArray = fileUtil.getTreeFiles('./public')
console.log(JSON.stringify(pathArray)) */
/* //读取所有叶子节点的文件路径
var pathArray = fileUtil.getArrayLeafFiles('./public')
console.log(JSON.stringify(pathArray)) */

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// 捕获404跳转页面的控制器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
