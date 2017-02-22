var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var merchantSchema = new Schema({

  id: String,
  pass: String,
  name: String,
  surname: String,
  jmbg: String,
  address: String,
  telephone: String,
  email: String,
});

var Merchant = mongoose.model('Merchant', merchantSchema);