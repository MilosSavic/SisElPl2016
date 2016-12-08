"use strict"
module.exports.execute = execute;

function execute(user,result){
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/insurance-user-price.nools";
	var flow = nools.compile(ruleFilePath);
	var Price = flow.getDefined("price");
	var Sport = mongoose.model('Sport');
	var User = flow.getDefined("user");
	var AgeFired = flow.getDefined("ageFired");
	var RiskFired = flow.getDefined("riskFired");


	var session = flow.getSession();
	session.assert(new AgeFired(false));
	session.assert(new RiskFired(false));

	//var us = {sport:{name:"fudbal",coefficient:0.75},age:66};
	//var totalPrice = assertFacts(us,function(result){
	//	console.log(result);
	//});
	var price = new Price(1000);
	session.assert(price);
	var sportRisk = 1;

	Sport.findById(user.body.sport).exec(function(err,sport){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(user.body.sport)
	      sportRisk = sport.coefficient;
	      otherStuff();
	    }

	  });

	function otherStuff(){
	var age = user.body.age; 
	//session.assert(new Message("goodbye"));
	session.assert(new User(sportRisk,age));

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

