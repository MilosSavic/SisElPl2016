"use strict"

var mongoose = require('mongoose'),
    CarInsurance = mongoose.model('CarInsurance'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller');

module.exports.list = list;
module.exports.createCarInsurance = createCarInsurance;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

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