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

  //logger.info("GET Request for all car insurance services. ");
  CarInsuranceService.find()
    .exec(function(err, carInsuranceServices){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
    //  logger.error("GET Car insurance service controller: " + errMessage);
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
    //  logger.info("GET Car insurance services successfuly listed. Status: 200");
      res.json(jsObject);
    }    
  });
}

function createCarInsuranceService(req, res, next){
	//logger.info("POST Request for creating car insurance service. ");
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var carInsuranceService = new CarInsuranceService(req.body);
    crypto.encryptData(carInsuranceService);
    // console.log(carInsuranceService);
  carInsuranceService.save(function (err, result) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
	 // logger.error("POST Car insurance service controller: " + errMessage+" Status: 400");
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
 // logger.info("POST Response for creating car insurance service. Status: 200 ");
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