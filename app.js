var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var upImg = require('./routes/upImg');
var picture = require('./routes/picture');
var sendSms = require('./routes/sendSms');
var registered = require('./routes/registered');
var login = require('./routes/login');
var verifyTel = require('./routes/verifyTel');
var deleteImg = require('./routes/deleteImg');

var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www.js-form-urlencoded 编码解析

app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/verifyTel', verifyTel);
app.use('/api/upImg', upImg);
app.use('/api/deleteImg', deleteImg);
app.use('/api/picture', picture);
// app.use('/api/sendSms', sendSms);
app.use('/api/registered', registered);
app.use('/api/login', login);
app.use('/public', express.static('public'));
// app.use('/static', express.static(__dirname + 'views/static'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
