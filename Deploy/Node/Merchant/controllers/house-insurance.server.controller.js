"use strict"

var mongoose = require('mongoose'),
    HouseInsurance = mongoose.model('HouseInsurance'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createHouseInsurance = createHouseInsurance;
module.exports.getHouseInsuranceById = getHouseInsuranceById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

console.log('Get all house insurances...');
  HouseInsurance.find()
    .exec(function(err, houseInsurances){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(houseInsurances);
    }
  });
}

function createHouseInsurance(req, res, next){
     req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var houseInsurance = new HouseInsurance(req.body);
    crypto.encryptData(houseInsurance);
    houseInsurance.save(function (err, houseInsurance) {
      if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
      res.json(houseInsurance);
      console.log("Save successful");
    }
    });

  
}

function getHouseInsuranceById(req, res, next,id){
	console.log('Get single house insurance...');
  HouseInsurance.findById(id).exec(function(err,houseInsurance){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
	  var decryptedHouseInsurance = crypto.decryptData(houseInsurance);
      res.json(decryptedHouseInsurance);
    }

  });
}