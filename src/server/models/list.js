const mongoose =  require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Item = require('./item');

const schema = new mongoose.Schema({
    name: String,
    items : [{
      name: String
  }]
});

module.exports = mongoose.model('List', schema);