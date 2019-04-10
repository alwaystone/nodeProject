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
/* 
var sql = require('mssql');
//连接方式1："mssql://用户名:密码@ip地址（无需端口号）/SqlServer名/数据库名称"
//连接方式2："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
sql.connect("mssql://ways:admin@localhost:1433/demo").then(function() {
//sql.connect("mssql://sa:123@localhost:1433/test").then(function() {
    // Query
    console.log('===================================')
    new sql.Request().query('select * from room').then(function(recordset) {
        console.log(recordset);
    }).catch(function(err) {
       console.log(err);
    });
    // Stored Procedure
}).catch(function(err) {
    console.log(err);
}); */

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
