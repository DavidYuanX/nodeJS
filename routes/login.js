var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
router.post('/', function (req, res) {
    let sql = `SELECT * FROM users`;
    sqlFun(sql, '',(error, results, fieldsThis) => {
        console.log(results)
        let userThis = results.filter((item)=>{return item.tel === req.body.tel})
        console.log(userThis)
        if(userThis.length){
            console.log(userThis[0].password,req.body.password)
            if(userThis[0].password === req.body.password){
                res.status(200).json(userThis[0])
            } else {
                res.status(403).json('密码错误！')
            }
        } else {
            res.status(403).json('用户名错误！')
        }
    },'end')
})

module.exports = router;