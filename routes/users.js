var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let sql = `SELECT * FROM users`;
    sqlFun(sql, '', (error, results, fieldsThis) => {
        // console.log(url.parse(req.url,true).query)
        // console.log(req.headers.authorization);
        let token = req.headers.authorization;
        console.log(token, results[0], fieldsThis);
        res.status(200).json(results)
        // try {
        //     a
        // } catch (e) {
        //     console.log(e.message)
        //     return res.status(500).json({ error: e.message });
        // }


        // jwt.verify(token, 'my_secret_key', function (err, decoded) { //jwt解析
        //     console.log(err,decoded)     //获取信息 进行下一步操作
        //     if (err) {
        //         // return res.status(200).json(err);
        //         console.log(err.message, "jwt expired")
        //         if (err.message === "jwt expired") {
        //             return res.status(200).json({success:false, msg:'token过期，请重新登录'});
        //         }
        //         return res.status(200).json({error: "登录信息有误"});
        //     } else {
        //         return res.status(200).json({success:true, msg:'token 正确'});
        //
        //     }
        //     // console.log(decoded)     //获取信息 进行下一步操作
        //
        //     //next();
        // });
        // res.status(200).json(results)
    }, 'end')
});

module.exports = router;
