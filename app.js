var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var task = require('./routes/task');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

var mongoose = require('mongoose');

// kết nối đến MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mean-app')
  .then(console.log('connection successful'));

// chạy API
app.use('/task', task);

// bắt lỗi 404, chuyển  cho handler bên dưới
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// xử lí lỗi
app.use(function(err, req, res, next) {
  // set locals, chỉ thông báo lỗi trong chế độ development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render trang báo
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
