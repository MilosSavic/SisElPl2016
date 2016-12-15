var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amountSchema = new Schema({

  amount: {
  type:	Number,
  required: "Amount is required"
  }
});

var Amount = mongoose.model('Amount', amountSchema);