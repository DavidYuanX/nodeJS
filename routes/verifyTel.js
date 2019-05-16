var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
/* GET users listing. */
router.get('/', function(req, res, next) {
    let sql = `SELECT * FROM users`;
    sqlFun(sql, '',(error, results, fieldsThis) => {
        let userThis = results.filter((item)=>{return item.tel === req.body.tel})
        console.log(results)
        res.status(200).json(userThis.length?false:true)
    },'end')
});

module.exports = router;
