"use strict"

var mongoose = require('mongoose'),
    Payment = mongoose.model('Payment'),
	errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createPayment = createPayment;
module.exports.createPaymentServer = createPaymentServer;

function list(req, res, next){

  Payment.find()
    .exec(function(err, payments){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      res.json({payments});
    }
  });
}




const notCreatedResult = 0;
const createdResult = 1;
const errorResult = -1;

//function which generates a random number for id, checks if exists in databes, and if it exists sends a notCreatedResult. In the createTransactionFunction, in case of a notCreatedResult
//function createUniqueRandomNumber gets called again. If it fails again, error message is generated.
function createUniqueRandomNumber(payment, result){
  var randomNumber = Math.floor(Math.random()*9000000000+1000000000);
  //var randomNumber = Math.floor(Math.random()*60);
    //check if random nubmer already exists
    Payment.find({ id: randomNumber }).exec(function(err,findresult){
    if(err)
   {

      var errMessage = errorHandler.getErrorMessage(err);
       errorHandler.logErrorMessage(errMessage);
       result(errorResult);
       return;
      
    }else if(findresult.length == 0)
      {
        payment.id = randomNumber;
        result(createdResult);
        return;
      }
      else {
         result(notCreatedResult)
         return;
      }

  })

}

function createPayment(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var payment = new Payment(req.body);    
    createUniqueRandomNumber(payment, function(result){
      if(result == createdResult)
        encryptAndSave();
      else if (result == notCreatedResult){
        errorHandler.logErrorMessage("WARNING: retrying ID generation");
        createUniqueRandomNumber(payment,function(result){
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
    //crypto.encryptData(transaction);

    payment.save(function (err,payment) {
      if (err){
          var errMessage = errorHandler.getErrorMessage(err);
          errorHandler.logErrorMessage(errMessage);
          return res.status(400).send({
            message: errMessage
          });
        }
        else{
      console.log("Save successful");
       res.json(payment); 
     }
    });
    }
   
}

function createPaymentServer(req, res, next){
    var payment = new Payment(req.body);
    var randomNumber = Math.floor(Math.random()*9000000000+1000000000);

    createUniqueRandomNumber(payment, function(result){
      if(result == createdResult)
        encryptAndSave();
      else if (result == notCreatedResult)
      { 
        errorHandler.logErrorMessage("WARNING: retrying ID generation");
        createUniqueRandomNumber(payment,function(result){
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
    //crypto.encryptData(transaction);

  payment.save(function (err, payment) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
	  //return {message: errMessage};
    }
    else{
  console.log("Save successful");
  res(payment);
 }
});
    
   }
}