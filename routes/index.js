var express = require('express');
var router = express.Router();
var fs = require('fs');

// var index = require('../views/index.html')
// /* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('public/index.html')
  // // res.render('index', { title: 'Express' });
  //   //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
  //   res.writeHead(200,{'Content-Type':'text/html'})
  //   // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
  //   fs.readFile('public/1.html','utf-8',function(err,data){
  //       if(err){
  //           throw err ;
  //       }
  //       res.end(data);
  //   });
});

module.exports = router;
