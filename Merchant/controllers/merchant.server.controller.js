"use strict"

module.exports.list = list;


var mongoose = require('mongoose'),
    Merchant = mongoose.model('Merchant'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
	crypto = require('./encrypt-decrypt');

//error URL!!!
const url = "https://localhost:3000/#!/error";
const successUrl = "https://localhost:3000/#!/success";
const failedUrl = "https://localhost:3000/#!/failed";

function list(req,res,next){
  
Merchant.find()
    .exec(function(err, merchants){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<merchants.length; i++)
      { 
        var decrypted = crypto.decryptData(merchants[i]);
        merchants[i] = decrypted;
      }
    if(merchants.length>0){
      var jsObject = {merchantID: merchants[0].id, merchantPassword: merchants[0].pass,errorURL: url, successURL: successUrl, failedURL: failedUrl};
      res.json(jsObject);
    }
    else res.json({message:'noMerchants'});
    }    
  });
  
}

