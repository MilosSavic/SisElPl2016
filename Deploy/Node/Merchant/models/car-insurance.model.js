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
        required: "Vehicle is required"
    },
    vehicleYear: {
        type: String,
        required: "Vehicle year is required"
    },
    plateNumber: {
        type: String,
        required: "Vehicle plate number is required"
    },
    chassisNumber: {
        type: String,
        required: "Vehicle chassis number is required"
    },
    ownerFirstName: {
        type: String,
        required: "Vehicle owner first name is required"
    },
    ownerLastName: {
        type: String,
        required: "Vehicle owner last name is required"
    },
    ownerJmbg: {
        type: String,
        required: "Vehicle owner jmbg is required"
    }

});


var CarInsurance = mongoose.model('CarInsurance', carInsuranceSchema);