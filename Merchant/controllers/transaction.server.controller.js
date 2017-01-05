"use strict";

var mongoose = require('mongoose'),
    Transaction = mongoose.model('Transaction'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller');

module.exports.list = list;
module.exports.createTransaction = createTransaction;
module.exports.getTransactionById = getTransactionById;
module.exports.createTransactionServer = createTransactionServer;

var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  Transaction.find()
    .exec(function(err, transactions){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<transactions.length; i++)
      { 
        var decrypted = crypto.decryptData(transactions[i]);
        transactions[i] = decrypted;
      }
      var jsObject = {transactions};
      res.json(jsObject);
    }    
  });
}

function createTransaction(req, res, next){
    var transaction = new Transaction(req.body);
    crypto.encryptData(transaction);

transaction.save(function (err, transaction) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
  console.log("Save successful");
   res.json(transaction); 
 }
});
    
   
}

function createTransactionServer(req, res, next){
    var transaction = new Transaction(req.body);
    crypto.encryptData(transaction);

transaction.save(function (err, transaction) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
	  //return {message: errMessage};
    }
    else{
  console.log("Save successful");
  res(transaction);
 }
});
    
   
}


function getTransactionById(req, res, next,id){
  Transaction.findById(id).exec(function(err,transaction){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(transaction);
    }

  });
}