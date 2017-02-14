var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({

  name: {
	  type: String,
	  required: "Sport name is required"
  },
  nameSer: 
  {
	  type: String,
	  required: "Sport name in Serbian is required"
  },
  coefficient: {
	  type: Number,
	  required: "Sport risk coefficient is required"
  }
});

var Sport = mongoose.model('Sport', sportSchema);