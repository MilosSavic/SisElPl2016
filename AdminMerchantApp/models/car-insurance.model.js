var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var carInsuranceSchema = new Schema({
    services: {
        type: [Schema.Types.ObjectId],
        ref: 'CarInsuranceService',
        required:true}
        ,
    vehicle: {
		type: String,
		required: "Vehicle is required."
	},
    vehicleYear: {
		type: String,
		required: "Vehicle year is required"
	},
	
    plateNumber: {
		type: String,
		required: "Plate number is required"
	},
	
    chassisNumber: {
		type: String,
		required: "Chassis number is required"
	},
    ownerFirstName: {
		type: String,
		required: "Owner first name is required"
	},
    ownerLastName: {
		type: String,
		required: "Owner last name is required"
	},
    ownerJmbg: {
		type: String,
		required: "Owner JMBG is required."
	}

});


var CarInsurance = mongoose.model('CarInsurance', carInsuranceSchema);