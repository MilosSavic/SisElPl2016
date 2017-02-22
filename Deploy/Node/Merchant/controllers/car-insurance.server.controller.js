"use strict"

var mongoose = require('mongoose'),
    CarInsurance = mongoose.model('CarInsurance'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createCarInsurance = createCarInsurance;
module.exports.getCarInsuranceById = getCarInsuranceById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){
	console.log('Get all car insurances...');
  CarInsurance.find()
    .exec(function(err, carInsurances){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(carInsurances);
    }
  });
}

function createCarInsurance(req, res, next){
     req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var carInsurance = new CarInsurance(req.body);
    crypto.encryptData(carInsurance);
    carInsurance.save(function (err, carInsurance) {
      if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
      res.json(carInsurance);
      console.log("Save successful");
    }
    });

}

function getCarInsuranceById(req, res, next,id){
	console.log('Get single car insurance...');
  CarInsurance.findById(id).exec(function(err,carInsurance){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
	  var decryptedCarInsurance = crypto.decryptData(carInsurance);
      res.json(decryptedCarInsurance);
    }

  });
}