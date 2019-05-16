var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
var url = require('url');
router.get('/', function (req, res) {
    let sql,data
    sql = `DELETE FROM img WHERE id = ?`;
    let urlQuery = url.parse(req.url,true).query,resData = []
    console.log(urlQuery)
    sqlFun(sql, urlQuery.id,(error, results, fieldsThis) => {
        if(results){
            res.status(200).json({msg:'删除成功！'})
        } else {
            res.status(200).json({msg:'删除失败！'})
        }
    },'end')
})

module.exports = router;
