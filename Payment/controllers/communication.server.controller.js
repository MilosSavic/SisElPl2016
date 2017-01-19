"use strict"

module.exports.getURLandID = getURLandID;
module.exports.checkCodeValidity = checkCodeValidity;

var paymentFunctions = require('./payment.server.controller');
var codeValid = false;
var crypto = require("crypto");
var generatedString;
var id;
function getURLandID(req, res, next){
	//!!!!!!!!!!
	//za sada samo proveravamo da li svi PODACI POSTOJE!!! MOZDA TREBA VISE!!!
	var isDataOk = req.body.merchantID && req.body.merchantPassword && req.body.transactionID && req.body.transactionAmount && req.body.errorURL;
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
			  
		  } 
	  }
		paymentFunctions.createPaymentServer(reqForPayment,function(response){
			id = response.id;
			res.json({url:"https://localhost:8000/#!/add/paymentForm/"+generatedString, paymentID: id});
		})
		
		//da li je u ovom slucaju setTimetout bezbedan?
		//kako bi ovo radilo ako bi vise korisnika koristilo sajt u isto vreme?
		setTimeout(function(){ generatedString = undefined; id = undefined; }, 60000);
		
	}
	
	else res.json({message:"bad request"});
	
}

function checkCodeValidity(req,res,next){
	if(req.body.code === generatedString && req.body.id == id)
		res.json({valid: true});
	else res.json({valid:false});
	
	
}


