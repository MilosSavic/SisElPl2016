"use strict"

var mongoose = require('mongoose'),
    Insurance = mongoose.model('Insurance');

module.exports.list = list;
module.exports.createInsurance = createInsurance;

function list(req, res, next){

  Insurance.find()
    .exec(function(err, insurances){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      res.json(insurances);
    }    
  });
}

function createInsurance(req, res, next){

	var insurance = new Insurance(req.body);
	insurance.save(function (err, insurance) {
	  if (err) return console.error(err);
	  console.log("Save successful");
	});

	res.json(insurance); 
}