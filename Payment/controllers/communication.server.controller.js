"use strict"


module.exports.getURLandID = getURLandID;

function getURLandID(req, res, next){
	//!!!!!!!!!!
	//za sada samo proveravamo da li svi PODACI POSTOJE!!! MOZDA TREBA VISE!!!
	var isDataOk = req.body.merchantID && req.body.merchantPassword && req.body.transactionID && req.body.transactionAmount && req.body.errorURL;
	if(isDataOk)
	{
		//ZA SADA VRACAMO BILO KAKAV STRING I BILO KAKAV BROJ!!!
		res.json({url:"https://localhost:8000", paymentID: 334343});
	}
	
	else res.json({message:"bad request"});
	
}
