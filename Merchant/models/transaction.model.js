var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({

  amount: Number,
  timestamp: Date
  
});

var Transaction = mongoose.model('Transaction', transactionSchemaSchema);
