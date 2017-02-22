"use strict";

var mongoose = require('mongoose'),
    Amount = mongoose.model('Amount'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createAmount = createAmount;
module.exports.getAmountById = getAmountById;

var crypto = require("./encrypt-decrypt");

function list(req, res, next){
 // logger.info("GET Request for all amounts received.");
  Amount.find()
    .exec(function(err, amounts){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      //logger.error("GET Amount controller: " + errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<amounts.length; i++)
      { 
        var decrypted = crypto.decryptData(amounts[i]);
        amounts[i] = decrypted;
      }
      var jsObject = {amounts};
     // logger.info("GET List all amounts - response sent. Status: 200");
      res.json(jsObject);
    }    
  });
}

function createAmount(req, res, next){
    //logger.info("POST create amount");
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var amount = new Amount(req.body);
    crypto.encryptData(amount);
  amount.save(function (err, amount) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      //logger.error("POST Amount controller: " + errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
   //logger.info("POST Create amount - response sent. Status: 200");
   res.json(amount); 
 }
});
    
   
}


function getAmountById(req, res, next,id){
  //logger.info("GET Get amount by id.");
  Amount.findById(id).exec(function(err,amount){
    if(err)
    { 
     var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      //logger.error("GET Amount controller: " + errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
     //  logger.info("GET Get amount by id - response sent. Status: 200");
      res.json(amount);
    }

  });
}