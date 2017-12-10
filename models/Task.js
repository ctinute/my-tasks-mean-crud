var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// tạo TaskSchema map với collection Task trong mongoDB, đồng thời định nghĩa cấu trúc của collection Task
var TaskSchema = Schema({
  name: String,
  description: String,
  dueTime: Date
});

module.exports = mongoose.model('Task', TaskSchema);
