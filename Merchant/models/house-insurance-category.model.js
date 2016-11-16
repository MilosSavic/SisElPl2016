var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var houseInsuranceCategorySchema = new Schema({ //defining UserScehma object using Schema constructor
      name: String
   });


var HouseInsuranceCategory = mongoose.model('Region', houseInsuranceCategorySchema); //using Schema instance to define User model.