var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var carInsuranceSchema = new Schema({
    services: [{type: Schema.Types.ObjectId,
    ref: 'CarInsuranceService'}],
    vehicle: String,
    vehicleYear: String,
    plateNumber: String,
    chassisNumber: String,
    ownerFirstName: String,
    ownerLastName: String,
    ownerJmbg: String

});


var CarInsurance = mongoose.model('CarInsurance', carInsuranceSchema);