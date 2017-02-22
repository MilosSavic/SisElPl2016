var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var houseInsuranceCategorySchema = new Schema({ //defining UserScehma object using Schema constructor
    name: {
		  type: String,
		  required: "House insurance category name is required"
	},
    nameSer: {
		type: String,
		required: "House insurance category name in Serbian is required."
	},
    riskFactor: {
		type: Number,
		required: "House insurance category risk factor is required."
	}
		
   });


var HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory', houseInsuranceCategorySchema); //using Schema instance to define User model.