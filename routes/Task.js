var express = require('express');
var router = express.Router();
var Task = require('../models/Task.js');

// Tạo các API để Angular truy xuất dữ liệu
// Angular gọi API -> API gọi mongoose schema để thao tác với dữ liệu


// lấy danh sách tất cả task
router.get('/', function(req, res, next) {
  Task.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// lấy task bằng Id
router.get('/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// lưu task
router.post('/', function(req, res, next) {
  Task.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// chỉnh sửa task
router.put('/:id', function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// xoá task
router.delete('/:id', function(req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
