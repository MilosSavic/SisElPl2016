var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({

  name: String,
  nameSer: String,
  coefficient: Number
});

var Sport = mongoose.model('Sport', sportSchema);