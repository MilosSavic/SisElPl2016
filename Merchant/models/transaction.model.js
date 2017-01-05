var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({

  amount: {
	  type: Number,
	  required: "Amount in transaction is required"
  },
  timestamp: {
	type: Date,
    default: Date.now
	},
  successful: Boolean
  
});

var Transaction = mongoose.model('Transaction', transactionSchema);
