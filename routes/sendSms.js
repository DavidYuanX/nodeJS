var express = require('express');
var router = express.Router();
var sendSms = require('../library/sms')
router.post('/', function (req, res) {
    console.log(req.body)
    sendSms(req.body.tel,(smsMsg)=>{
        console.log(smsMsg)
        res.status(200).json(smsMsg)
    })
})

module.exports = router;