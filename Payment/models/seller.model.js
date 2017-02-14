var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log("Prosli atributi");

var sellerSchema = new Schema({
	id: {
		type: String,
		required: "Merchant ID is required"
	},
	password: {
		type: String,
		required: "Merchant password is required"
	},
    name: String,
    surname: String,
    address: String,
    jmbg: String,
    email: String

});

console.log("Prosli atributi");

var Seller = mongoose.model('Seller', sellerSchema );