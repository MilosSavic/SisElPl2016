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
    expiry_date: String,
    transaction_amount: Number,
    date_created: {
    type: Date,
    default: Date.now
  },
    merchant: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required:true
    },
    acquirerId : {
        type: Number,
        unique: "acquirer id number must be unique"
    },
    acquirerTimestamp: {
        type: Date
    }


});

var Payment = mongoose.model('Payment', paymentSchema );