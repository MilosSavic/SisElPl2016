var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var regionSchema = new Schema({ //defining UserScehma object using Schema constructor
      name: String,
      nameSer: String,
      risk: Number
   });


var Region = mongoose.model('Region', regionSchema); //using Schema instance to define User model.
