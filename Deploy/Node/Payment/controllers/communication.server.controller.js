"use strict"

module.exports.getURLandID = getURLandID;
module.exports.checkCodeValidity = checkCodeValidity;

var paymentFunctions = require('./payment.server.controller');
var codeValid = false;
var _paymentID = "";
var _errorURL = "";
var _merchantOrderId;
var generatedString;
var id;

var users = [];

var crypto = require("crypto");

var mongoose = require('mongoose')
var Seller = mongoose.model('Seller');
var	errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    encdec = require("./encrypt-decrypt");

function getURLandID(req, res, next){
	var merchantOK = true;
	var errorMessage = "Bad request";
	var _merchant = undefined;

	Seller.findOne({id:req.body.merchantID}).exec(function(err,seller){
    if(err)
    { 
     var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      errorMessage = errMessage;
      merchantOK = false;
      checkTheRest();
    }else {
   		if(seller){
   		  encdec.decryptData(seller);
	      if(!seller.id){
	      	errorMessage = "Merchant not found"
	      	merchantOK = false;
	      	checkTheRest();
	      }
	      else {
	      	if(req.body.merchantPassword != seller.password)
	      	{
	      		merchantOK = false;
	      		errorMessage = "Wrong merchant password";
	      		checkTheRest();
	      	}
	      	else {
	      		_merchant = seller;
	      		checkTheRest();
	      	}
	      }
	  }
	  else {
	  	merchantOK = false;
	  	errorMessage = "Merchant not found";
	  	checkTheRest();

	  }
      
    }

  });

	 if(!req.body.transactionID)
	 	errorMessage = "ERROR: No transaction ID";
	 else if(!req.body.transactionAmount)
	 	errorMessage = "ERROR: No transaction amount";
	 else if(!req.body.errorURL)
	 	errorMessage = "ERROR: No error url";
	 else if(!req.body.merchantTimestamp)
	 	errorMessage = "ERROR: No merchant timestamp";

	 function checkTheRest(){
	//za sada samo proveravamo da li merchant postoji u ovoj bazi, a za ostale podatke da li postoje. MOZDA TREBA VISE!!!
		var isDataOk = merchantOK && req.body.transactionID && req.body.transactionAmount && req.body.errorURL && req.body.merchantTimestamp;
		if(isDataOk)
		{
			generatedString = crypto.randomBytes(20).toString('hex');
			//ZA SADA BILO KAKAV BROJ!!!
			//GENERISANI STRING, PROSIRITI U SKLADU SA LUBURICEVIM UPUTSTVIMA
			//2. To je sada na vama da isprojektujete, ali eventualno bih na tvoj primer dodao malo više semantike, tipa <host address>/payment/<generated>,
			// gde kada odeš na tu stranicu dobiješ formu za pravljenja tvog paymenta. Ova stranica bi trebala da ima neki timeout, odnosno generisan payment
			// ID i string bi trebali da isteknu npr. posle 15 minuta, kako ne bi mogao da (u slučaju da ne koristiš dobar random generator za string) pogodim payment
			// string od nekog drugog kupca (defense in depth).
			//
			//
			var reqForPayment = {
			  body: {
			  	  transaction_amount: req.body.transactionAmount,
				  merchant: _merchant._id
			  } 
		  }
			paymentFunctions.createPaymentServer(reqForPayment,function(response){
				id = response.id;
				_paymentID = response._id;

				_errorURL = req.body.errorURL;
				_merchantOrderId = req.body.transactionID;

				var generationTime = new Date();
				users.push(
				{
					generatedString:generatedString,
					id: id,
					_merchantOrderId: _merchantOrderId,
					_paymentID: _paymentID,
					_errorURL: _errorURL,
					generationTime: generationTime
				});

				res.json({url:"https://localhost:8000/#!/add/paymentForm/"+generatedString, paymentID: id});
			})
			//da li je u ovom slucaju setTimetout bezbedan?
			//kako bi ovo radilo ako bi vise korisnika koristilo sajt u isto vreme?
			

			//setTimeout(function(){ generatedString = undefined; id = undefined; _paymentID = undefined; _errorURL = undefined;}, 600000);
			
		}
	
	else res.json({message:errorMessage});
	}
	
}

function checkCodeValidity(req,res,next){

	var user = undefined;
	var currentTime = new Date();

	for(var i=0; i<users.length; i++)
	{
		if(Math.abs(currentTime-users[i].generationTime)<1800000){
			if(users[i].id == req.body.id && users[i].generatedString == req.body.code)	
				{
					user = users[i];
					break;
				}
		}
		else {
			users.splice(i,1);
		}
	}

	console.log('BROJ USERA ZA PAYMENT SAJT: '+users.length);
	console.log('REQUEST: ' +JSON.stringify(req.body));
	if(user)
		res.json({valid: true, payment_id: user._paymentID, errorURL: user._errorURL, merchantOrderId: user._merchantOrderId });
	else res.json({valid:false});
	
	
}

