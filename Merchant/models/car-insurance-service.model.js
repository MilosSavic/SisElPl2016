var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var carInsuranceServiceSchema = new Schema({ //defining UserScehma object using Schema constructor
      name: String,
      riskFactor: Number
   });


var CarInsuranceService = mongoose.model('CarInsuranceService', carInsuranceServiceSchema); //using Schema instance to define User model.