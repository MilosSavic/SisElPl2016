var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var carInsuranceServiceSchema = new Schema({ //defining UserScehma object using Schema constructor
      name: {
      	type: String,
      	required: "Name is required"
      },
      serviceGroup: {
      	type: Number,
      	required: "You have to insert a service group"
      },
      riskFactor: {
      	type: Number,
      	required: "You have to insert a risk factor"
      }
   });


var CarInsuranceService = mongoose.model('CarInsuranceService', carInsuranceServiceSchema); //using Schema instance to define User model.