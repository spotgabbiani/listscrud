const mongoose =  require('mongoose');
const Item = require('./item');

const schema = new mongoose.Schema({
    name: String,
    items : [Item.schema]
});

module.exports = mongoose.model('List', schema);