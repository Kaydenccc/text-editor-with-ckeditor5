const mongoose = require('mongoose');
//membuat Schema
const Schema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Blog', Schema);
