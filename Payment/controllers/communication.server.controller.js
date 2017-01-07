"use strict"


module.exports.getURLandID = getURLandID;
var crypto = require("crypto");
function getURLandID(req, res, next){
	//!!!!!!!!!!
	//za sada samo proveravamo da li svi PODACI POSTOJE!!! MOZDA TREBA VISE!!!
	var isDataOk = req.body.merchantID && req.body.merchantPassword && req.body.transactionID && req.body.transactionAmount && req.body.errorURL;
	if(isDataOk)
	{
		var generatedString = crypto.randomBytes(20).toString('hex');
		//ZA SADA BILO KAKAV BROJ!!!
		//GENERISANI STRING, PROSIRITI U SKLADU SA LUBURICEVIM UPUTSTVIMA
		//2. To je sada na vama da isprojektujete, ali eventualno bih na tvoj primer dodao malo više semantike, tipa <host address>/payment/<generated>,
		// gde kada odeš na tu stranicu dobiješ formu za pravljenja tvog paymenta. Ova stranica bi trebala da ima neki timeout, odnosno generisan payment
		// ID i string bi trebali da isteknu npr. posle 15 minuta, kako ne bi mogao da (u slučaju da ne koristiš dobar random generator za string) pogodim payment
		// string od nekog drugog kupca (defense in depth).
		//
		//
		res.json({url:"https://localhost:8000/#!/add/paymentForm/"+generatedString, paymentID: -1});
	}
	
	else res.json({message:"bad request"});
	
}
