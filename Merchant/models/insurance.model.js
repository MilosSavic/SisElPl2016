var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insuranceSchema = new Schema({

  startDate: {
    type: Date
  },

  endDate: Date,
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'//,
    //require:true
  },

  numberOfUsers: Number,

  created: {
    type: Date,
    default: Date.now
  },

  price: Number,

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
  }
});

var Insurance = mongoose.model('Insurance', insuranceSchema);
