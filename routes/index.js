var express = require('express');
var db = require('../utils/mssqlDbUtil.js');
var mysqlDb = require('../utils/mysqlDbUtil.js');
var moment = require('moment');
var fs=require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /* db.selectAll('v_room', function (err, result) {//查询所有news表的数据
      console.log(result)
      //res.send(result)
      res.render('index'); // 重定向到index.html页面
    }); */
    mysqlDb.query('select * from role_menu', function (err, rows, fields) {//查询所有news表的数据
      console.log(rows[0].count)
      res.send(rows)
      res.render('index'); // 重定向到index.html页面
    })
});

router.get('/getAll', function (req, res, next) { // 在index.html的初始化加载部分已经调用过了
  /* db.selectAll('v_room', function (err, result) {//查询所有news表的数据
    console.log(result)
    res.send(result)
  }); */
  mysqlDb.query('select * from role_menu', function (err, rows, fields) {//查询所有news表的数据
    console.log(rows[0].count)
    res.send(rows)
  })
});

router.get('/getData', function (req, res, next) {
  var data = fs.readFileSync('./public/data/baseData.json','utf-8');
  console.log(data);
  res.send(data) ;
});

router.get('/getData1', function (req, res, next) {
  var data = fs.readFileSync('./public/data/baseData.json','utf-8');
  console.log(typeof data);
  res.send(data) ;
});

router.get('/download', function (req, res, next) {

  　//第一种方式
    //var f="F:/ftproot/NW.js.docx";
    //var f="f:/ftproot/我是中文的语言.txt"
    ////var f = req.params[0];
    //f = path.resolve(f);
    //console.log('Download file: %s', f);
    //res.download(f);
  
    //第二种方式
    var path="./public/data/baseData.json";
    var f = fs.createReadStream(path);
    res.writeHead(200, {
      'Content-Type': 'application/force-download',
      'Content-Disposition': 'attachment; filename=baseData.json'
    });
    f.pipe(res);
  });

router.get('/delete/:id', function (req, res, next) {//删除一条id对应的news表的数据
    var id = req.params.id;
    db.del("where id = @id", {id:id}, "news", function(err, result){
        res.redirect('back');//返回前一个页面
    });
});
router.post('/update/:id', function (req, res, next) {//更新一条对应id的news表的数据
    var id = req.params.id;
    var content = req.body.content;
    db.update({content:content}, {id:id}, "news", function(err, result){
        res.redirect('back');
    });
});

module.exports = router;
