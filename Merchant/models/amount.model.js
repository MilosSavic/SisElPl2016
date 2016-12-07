var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amountSchema = new Schema({

  amount: Number,
});

var Amount = mongoose.model('Amount', amountSchema);