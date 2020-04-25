var express = require('express');
var router = express.Router();
var sqlFun = require('../library/connection')
const jwt = require('jsonwebtoken');


router.post('/', function (req, res) {
    let sql = `SELECT * FROM users`;
    sqlFun(sql, '', (error, results, fieldsThis) => {

        try {

            console.log(results)
            let userThis = results.filter((item) => { return item.name === req.body.loginName }),
                aaa = req.body.password
            console.log(userThis);
            if (userThis.length) {
                // Math.floor(Date.now() / 1000) + (60 * 15)
                // const token = jwt.sign({ key, exp: 30 }, 'my_secret_key');
                if (userThis[0].password === req.body.password) {
                    res.status(200).json({
                        // token: token,
                        user: userThis[0]
                    })
                } else {
                    res.status(403).json('密码错误！')
                }
            } else {
                res.status(403).json('用户名错误！')
            }

        }
        catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
    }, 'end')
})


module.exports = router;