const mongoose =  require('mongoose');

const schema = new mongoose.Schema({
    name: String
});

module.exports = {model: mongoose.model('Item', schema), schema: schema};