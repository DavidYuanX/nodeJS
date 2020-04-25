var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
var url = require('url');
router.get('/', function (req, res) {
    let sql,data
    sql = `SELECT * FROM img`;
    sqlFun(sql, '',(error, results, fieldsThis) => {
        console.log(url.parse(req.url,true).query,results)
        res.status(200).json(results)
        // let urlQuery = url.parse(req.url,true).query,resData = []
        // if(results&&results.length){
        //     for (let i=0;i<urlQuery.pageSize;i++) {
        //         resData.push(results[Math.floor(Math.random()*results.length)])
        //     }
        // }
    },'end')
})

module.exports = router;
