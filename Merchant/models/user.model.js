var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  name: String,
  surname: String,
  jmbg: String,
  passportNumber: String,
  address: String,
  telephone: String,
  isContractor: Boolean,       //ugovarac na engleskom? :D
  email: String,
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