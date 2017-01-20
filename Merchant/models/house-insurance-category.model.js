var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var houseInsuranceCategorySchema = new Schema({ //defining UserScehma object using Schema constructor
      name: String,
      nameSer: String,
      riskFactor: Number
   });


var HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory', houseInsuranceCategorySchema); //using Schema instance to define User model.