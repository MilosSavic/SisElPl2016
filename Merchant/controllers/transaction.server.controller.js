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

const notCreatedResult = 0;
const createdResult = 1;
const errorResult = -1;

//function which generates a random number for id, checks if exists in databes, and if it exists sends a notCreatedResult. In the createTransactionFunction, in case of a notCreatedResult
//function createUniqueRandomNumber gets called again. If it fails again, error message is generated.
function createUniqueRandomNumber(transaction, result){
  var randomNumber = Math.floor(Math.random()*9000000000+1000000000);
  //var randomNumber = Math.floor(Math.random()*60);
    //check if random nubmer already exists
    Transaction.find({ idNumber: randomNumber }).exec(function(err,findresult){
    if(err)
   {

      var errMessage = errorHandler.getErrorMessage(err);
       errorHandler.logErrorMessage(errMessage);
       result(errorResult);
       return;
      
    }else if(findresult.length == 0)
      {
        transaction.idNumber = randomNumber;
        result(createdResult);
        return;
      }
      else {
         result(notCreatedResult)
         return;
      }

  })

}

function createTransaction(req, res, next){
    var transaction = new Transaction(req.body);
    
    createUniqueRandomNumber(transaction, function(result){
      if(result == createdResult)
        encryptAndSave();
      else if (result == notCreatedResult){
        errorHandler.logErrorMessage("WARNING: retrying ID generation");
        createUniqueRandomNumber(transaction,function(result){
          if(result == createdResult)
            encryptAndSave();
          else if (result == notCreatedResult){
            errorHandler.logErrorMessage("ID number generation failed for the second time. Something is obviously very wrong. It's possible that there are too many IDs in the database and too few random numbers.");
            return res.status(400).send({
            message: "ID number generation failed"
          });
          }
          else return res.status(400).send({
            message: "Server error during ID number generation"
          });;
        });
      }
      else return res.status(400).send({
            message: "Server error during ID number generation"
          });;
    })
    function encryptAndSave(){
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
   
}

function createTransactionServer(req, res, next){
    var transaction = new Transaction(req.body);
    var randomNumber = Math.floor(Math.random()*9000000000+1000000000);

    createUniqueRandomNumber(transaction, function(result){
      if(result == createdResult)
        encryptAndSave();
      else if (result == notCreatedResult)
      { 
        errorHandler.logErrorMessage("WARNING: retrying ID generation");
        createUniqueRandomNumber(transaction,function(result){
          if(result == createdResult)
            encryptAndSave();
          else if (result == notCreatedResult)
          {
            errorHandler.logErrorMessage("ID number generation failed for the second time. Something is obviously very wrong. It's possible that there are too many IDs in the database and too few random numbers.");
            return;
          }
          else return;
        });
      }
      else return;
    })

    function encryptAndSave(){
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