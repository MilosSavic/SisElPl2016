var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({

    id : {
		type: Number,
		unique: "id number must be unique"
		},
    url : String,
    pan: String,
    security_code: String,
    card_holder_name: String,
    expiry_date: Date

});

var Payment = mongoose.model('Payment', paymentSchema );