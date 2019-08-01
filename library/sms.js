// const Core = require('@alicloud/pop-core');
var md5 = require('md5');
//
// var client = new Core({
//     accessKeyId: '',
//     accessKeySecret: '',
//     endpoint: '',
//     apiVersion: '2017-05-25'
// });
let sendSms = function (PhoneNumbers,callback) {
    // let code = Math.floor(Math.random()*9999)
    // let params = {
    //     "RegionId": "cn-hangzhou",
    //     "PhoneNumbers": PhoneNumbers.toString(),
    //     "SignName": "小小小小的商城",
    //     "TemplateCode": "SMS_160571696",
    //     "TemplateParam": "{code:"+code+"}"
    // }
    // let requestOption = {
    //     method: 'POST'
    // };
    // console.log(code)
    // callback && callback(md5(code))
    // client.request('SendSms', params, requestOption).then((result) => {
    //     callback && callback({smsRes:result,code:md5(code)})
    // }, (ex) => {
    //     callback && callback({smsRes:ex,code:ex.Message})
    // })
}

module.exports = sendSms;
