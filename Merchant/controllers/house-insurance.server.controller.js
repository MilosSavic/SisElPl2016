"use strict"

var mongoose = require('mongoose'),
    HouseInsurance = mongoose.model('HouseInsurance');

module.exports.list = list;
module.exports.createHouseInsurance = createHouseInsurance;

function list(req, res, next){

console.log("Usao");
  HouseInsurance.find()
    .exec(function(err, houseInsurances){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      res.json(houseInsurances);
    }
  });
}

function createHouseInsurance(req, res, next){

  console.log("Usao");
    var houseInsurance = new HouseInsurance(req.body);
    houseInsurance.save(function (err, houseInsurance) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(houseInsurance);
}