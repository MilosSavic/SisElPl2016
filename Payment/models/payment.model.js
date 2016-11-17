var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({

    id : String,
    url : String,
    pan: String,
    security_code: String,
    card_holder_name: String,
    expiry_date: Date

});

var Payment = mongoose.model('Payment', paymentSchema );