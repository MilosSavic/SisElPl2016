"use strict"

var mongoose = require('mongoose'),
    Payment = mongoose.model('Payment');

module.exports.list = list;
module.exports.createPayment = createPayment;

function list(req, res, next){

  Payment.find()
    .exec(function(err, payments){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      res.json({payments});
    }
  });
}

function createPayment(req, res, next){

    var payment = new Payment(req.body);
    payment.save(function (err, payment) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(payment);
}