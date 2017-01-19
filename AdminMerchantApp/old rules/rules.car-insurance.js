"use strict"
module.exports.execute = execute;

//var ci = {body:{services:["584d624146179f29648a7e27","584d6036981239133076210d","584d625c46179f29648a7e29"]}};
//execute(ci, function(result){
//	console.log(result);
//})
function execute(carInsurance,result){
	console.log("USLI SMO U CAR INSURANCE RULES");
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/car-insurance-price.nools";
	var flow = nools.compile(ruleFilePath);
	var Price = flow.getDefined("price");
	var CarInsuranceService = mongoose.model('CarInsuranceService');
	var CarInsurance = flow.getDefined("carInsurance");
	var ServicesFired = flow.getDefined("ServicesFired");


	var session = flow.getSession();
	session.assert(new ServicesFired(false));

	//var us = {sport:{name:"fudbal",coefficient:0.75},age:66};
	//var totalPrice = assertFacts(us,function(result){
	//	console.log(result);
	//});
	var price = new Price(1000);
	session.assert(price);
	var services = [];

	for(var i=0; i<carInsurance.body.services.length; i++){
	CarInsuranceService.findById(carInsurance.body.services[i]).exec(function(err,category){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(carInsurance.body.services)
	      	services.push(category.riskFactor);
	      	if(services.length==carInsurance.body.services.length)
	      		otherStuff();
	     
	    }

	  });
}

	function otherStuff(){
	//session.assert(new Message("goodbye"));
	session.assert(new CarInsurance(services));

	session.match(function(err){
	    if(err){
	        console.error(err.stack);
	    }else{
	        console.log("done");
	        nools.deleteFlows();
	      	result.json(price);
	    }
	})
	}

}