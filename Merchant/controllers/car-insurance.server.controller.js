"use strict"

var mongoose = require('mongoose'),
    CarInsurance = mongoose.model('CarInsurance');

module.exports.list = list;
module.exports.createCarInsurance = createCarInsurance;

function list(req, res, next){

  CarInsurance.find()
    .exec(function(err, carInsurances){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      res.json(carInsurances);
    }
  });
}

function createCarInsurance(req, res, next){

    var carInsurance = new CarInsurance(req.body);
    carInsurance.save(function (err, carInsurance) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(carInsurance);
}