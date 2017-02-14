var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var houseInsuranceSchema = new Schema({

  size: {
	  type: Number,
	  required: "House size is required."
  },
  age: {
	  type: Number,
	  required: "House age is required."
  },
  estimatedValue: {
	  type: Number,
	  required: "House estimated value is required"
  },
  coveredByInsurance: [{
  	type: Schema.Types.ObjectId,
    ref: 'HouseInsuranceCategory'
  }],
  adress: {
	  type: String,
	  required: "House address is required"
  },
  ownerFirstName:{ 
	type: String,
	required: "House owner first name is required"
  },
  ownerLastName: {
	  type: String,
	  required: "House owner last name is required"
  },
  ownerJMBG: {
	  type: String,
	  required: "House owner JMBG is required"
  }

});


var HouseInsurance = mongoose.model('HouseInsurance', houseInsuranceSchema);
