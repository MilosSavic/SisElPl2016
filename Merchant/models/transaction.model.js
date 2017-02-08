var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({

  idNumber:{
  	type: Number,
  	unique: "id number must be unique"
  },
  amount: {
	  type: Number,
	  required: "Amount in transaction is required"
  },
  timestamp: {
	type: Date,
    default: Date.now
	},
  successful: {
	  type: Boolean,
	  default: false
  },

  emailsSent: {
    type: Boolean,
    default: false
  },

  acquirerOrderId: {
	  type: Number
  },
  acquirerTimestamp: {
	  type: Date
  }
  
});

var Transaction = mongoose.model('Transaction', transactionSchema);
