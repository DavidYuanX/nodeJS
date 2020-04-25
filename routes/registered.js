var express = require('express');
var router = express.Router();
var md5 = require('md5');
var sqlFun = require('../library/connection')
router.post('/', function (req, res) {
    console.log(req.body, new Date().getTime())
    let sql = `INSERT INTO users(name,tel,password,registrationTime)
            VALUES(?,?,?,?)`;
    let data = [req.body.loginName, req.body.tel, req.body.password, new Date().getTime()];
    sqlFun(sql, data, (error, results, fieldsThis) => {
        console.log(error, results)
        if (results) {
            res.status(200).json('注册成功！')
        }
    }, 'end')
})

module.exports = router;