var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insuranceSchema = new Schema({

  insuranceDuration: {
    type: Number
  },
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
  
  amount: Number,
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
  }
});

var Insurance = mongoose.model('Insurance', insuranceSchema);
