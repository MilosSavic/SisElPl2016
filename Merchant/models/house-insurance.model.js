var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var houseInsuranceSchema = new Schema({

  duration:Number,
  size: Number,
  age: Number,
  estimatedValue: Number,
  coveredByInsurance: [{
  	type: Schema.Types.ObjectId,
    ref: 'HouseInsuranceCategory'
  }],
  adress: String,
  ownerFirstName: String,
  ownerLastName: String,
  ownerJMBG: String

});


var HouseInsurance = mongoose.model('HouseInsurance', houseInsuranceSchema);
