"use strict"
module.exports.execute = execute;

function execute(insurance,result){
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/insurance-price.nools";
	var flow = nools.compile(ruleFilePath);
	var Message = flow.getDefined("message");
	var Price = flow.getDefined("price");
	var Region = mongoose.model('Region');


	var session = flow.getSession();

	//var us = {sport:{name:"fudbal",coefficient:0.75},age:66};
	//var totalPrice = assertFacts(us,function(result){
	//	console.log(result);
	//});
	var price = new Price(insurance.body.totalPrice);
	session.assert(price);
	var regionRisk = -400;
	Region.findById(insurance.body.region).exec(function(err,region){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	      regionRisk = region.risk;
	      otherStuff();
	    }

	  });
	//console.log(JSON.stringify(insurance.body));
	console.log(JSON.stringify(price));
	function otherStuff(){
	var numberOfUsers = insurance.body.numberOfUsers; 
	//session.assert(new Message("goodbye"));
		var messageNumberOfUsers = new Message("number",numberOfUsers);
		session.assert(messageNumberOfUsers);
		var messageRegionRisk = new Message("risk",regionRisk);
		session.assert(messageRegionRisk);

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

