var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var regionSchema = new Schema({ //defining UserScehma object using Schema constructor
      name: {
		  type: String,
		  required: "Region name is required"
	  },
      nameSer: {
		  type: String,
		  required: "Region name in Serbian is required"
	  },
      risk: {
		  type: Number,
		  required: "Region risk is required"
	  }
   });


var Region = mongoose.model('Region', regionSchema); //using Schema instance to define User model.
