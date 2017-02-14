var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insuranceSchema = new Schema({

  startDate: {
    type: Date,
	required: "Insurance start date is required"
  },

  endDate: {
	  type: Date,
	  required: "Insurance end date is required"
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'//,
    //require:true
  },

  numberOfUsers: {
	  type: Number,
	  required: "Insurance number of users is required"
  },

  created: {
    type: Date,
    default: Date.now
  },

  price: {
	  type: Number
  },

  users:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  carInsurance:{
    type: Schema.Types.ObjectId,
    ref: 'CarInsurance'
  },
  houseInsurance:{
    type: Schema.Types.ObjectId,
    ref: 'HouseInsurance'
  },
  amount: {
    type: Schema.Types.ObjectId,
    ref: 'Amount'
  },
  
  transaction: {
	  type: Schema.Types.ObjectId,
	  ref: 'Transaction'
  }
});

var Insurance = mongoose.model('Insurance', insuranceSchema);
