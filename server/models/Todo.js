// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  link: String,
  position: Number,
  completed: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);
