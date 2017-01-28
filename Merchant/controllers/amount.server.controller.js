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
  Amount.find()
    .exec(function(err, amounts){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
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
      res.json(jsObject);
    }    
  });
}

function createAmount(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var amount = new Amount(req.body);
    crypto.encryptData(amount);
  amount.save(function (err, amount) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
   console.log("Save successful");
   res.json(amount); 
 }
});
    
   
}


function getAmountById(req, res, next,id){
  Amount.findById(id).exec(function(err,amount){
    if(err)
    { 
     var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(amount);
    }

  });
}