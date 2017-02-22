var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  name: {
	  type: String,
	  required: "User first name is required"
  },
  surname: {
	  type: String,
	  required: "User last name is required"
  },
  jmbg: {
	  type: String,
	  required: "User JMBG is requried"
  },
  passportNumber: {
	  type: String,
	  required: "User passport number is required"
  },
  address: {
	  type: String,
	  required: "User address is required"
  },
  telephone: {
	  type: String,
	  required: "User telephone is required."
  },
  isContractor: Boolean,       //ugovarac na engleskom? :D
  email: {
	  type: String,
	  required: "User email is required."
  },
  age: {
	  type: Number,
	  min: 0, 
	  max: 135
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'Sport'
  }
});

var User = mongoose.model('User', userSchema);