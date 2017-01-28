"use strict";

var mongoose = require('mongoose'),
    CarInsuranceService = mongoose.model('CarInsuranceService'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createCarInsuranceService = createCarInsuranceService;
module.exports.getCarInsuranceServiceById = getCarInsuranceServiceById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  CarInsuranceService.find()
    .exec(function(err, carInsuranceServices){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<carInsuranceServices.length; i++)
      { 
        var decrypted = crypto.decryptData(carInsuranceServices[i]);
        carInsuranceServices[i] = decrypted;
      }
      var jsObject = {carInsuranceServices};
      res.json(jsObject);
    }    
  });
}

function createCarInsuranceService(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var carInsuranceService = new CarInsuranceService(req.body);
    crypto.encryptData(carInsuranceService);
    // console.log(carInsuranceService);
  carInsuranceService.save(function (err, result) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
  console.log("Save successful");
  res.json(carInsuranceService); 
}
});

    
}


function getCarInsuranceServiceById(req, res, next,id){
  CarInsuranceService.findById(id).exec(function(err,result){
    if(err)
    {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(result);
    }

  });
}