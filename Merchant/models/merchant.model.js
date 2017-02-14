var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var merchantSchema = new Schema({

  id: {
	  type: String,
	  required: "Merchant ID is required"
  },
  pass: {
	  type: String,
	  required: "Merchant password is required"
  },
  name: String,
  surname: String,
  jmbg: String,
  address: String,
  telephone: String,
  email: String,
});

var Merchant = mongoose.model('Merchant', merchantSchema);