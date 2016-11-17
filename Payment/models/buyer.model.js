var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buyerSchema = new Schema({

    name: String,
    surname: String,
    address: String,
    jmbg: String,
    email: String,
    pan: String,
    security_code: String,
    card_holder_name: String,
    expiry_date: Date

});

var Buyer = mongoose.model('Buyer', buyerSchema );