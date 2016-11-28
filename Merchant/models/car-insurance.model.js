var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var carInsuranceSchema = new Schema({
    duration: Number,
    services: String,
    vehicle: String,
    vehicleYear: String,
    plateNumber: String,
    chassisNumber: String,
    ownerFirstName: String,
    ownerLastName: String,
    ownerJmbg: String

});


var CarInsurance = mongoose.model('CarInsurance', carInsuranceSchema);