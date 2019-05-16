var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
/* GET users listing. */
router.get('/', function(req, res, next) {
    let sql = `SELECT * FROM users`;
    sqlFun(sql, '',(error, results, fieldsThis) => {
        // console.log(url.parse(req.url,true).query)
        // console.log(results)
        res.status(200).json(results)
    },'end')
});

module.exports = router;
