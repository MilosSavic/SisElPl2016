"use strict"

module.exports.getURL = getURL;

var merchantFunctions = require('./merchant.server.controller');
var codeValid = false;
var crypto = require("crypto");
var mongoose = require('mongoose')
var Merchant = mongoose.model('Merchant');
var Transaction = mongoose.model('Transaction');
var	errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    encdec = require("./encrypt-decrypt");

function getURL(req, res, next){
	var request = req.body;
	const url = "https://localhost:3000/#!/error";
	const successUrl = "https://localhost:3000/#!/success";
	const failedUrl = "https://localhost:3000/#!/failed";

	var errorMessage = "";
	var result;
	Merchant.find()
    .exec(function(err, merchants){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage("communication.server.controller: "+errMessage);
      return res.status(400).send({
        message: "communication.server.controller: " + errMessage, url: url
      });
    }else {
      for(var i=0; i<merchants.length; i++)
      { 
        var decrypted = encdec.decryptData(merchants[i]);
        merchants[i] = decrypted;
      }
	  if(merchants.length>0){
      checkTheRequest();
	  }
	  else res.status(500).send({message:'noMerchants', url: url});
    }    
  });



    function checkTheRequest(){
		if(request.status == "OK" && request.message.includes("Issuer: Transaction completed."))
		{
			   Transaction.find({ idNumber: request.merchantOrderId }).exec(function(err,findresult){
				    if(err)
				   {

				      var errMessage = errorHandler.getErrorMessage(err);
				       errorHandler.logErrorMessage("communication.server.controller: "+errMessage);
				       res.status(500).send({url: failedUrl, message: 'Merchant server error occured while trying to find merchant order id.'});
				       return;
				      
				    }else if(findresult.length == 0)
				      {
				        res.status(404).send({url: failedUrl, message: 'Merchant order id not found.'});
				        return;
				      }
				      else {
				      	 findresult = findresult[0];
				      	 findresult.successful = true;
				      	 findresult.save(function(err,result){
							if (err){
					          var errMessage = errorHandler.getErrorMessage(err);
					          errorHandler.logErrorMessage(errMessage);
					            res.status(500).send({url:failedUrl,message: 'Error while updating transaction in Merchant App.'});

					        //return {message: errMessage};
					        }
					        else{
					        console.log("Update successful");
					        res.status(200).send({url: successUrl});
					       }
				      	 })
				      }

				  })

			
		}
		else
		{
			res.status(200).send({url: failedUrl}); //doslo je do greske u komunikaciji, vrati failed url
		}
	}


}