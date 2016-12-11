"use strict"
module.exports.execute = execute;

//var hi = {body:{age:50,size:444,estimatedValue:34663, coveredByInsurance:["584bf80f5acf0a2bc4c23b95","584bf7505acf0a2bc4c23b94"]}};
//execute(hi, function(result){
//	console.log(result);
//})
function execute(houseInsurance,result){
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/house-insurance-price.nools";
	var flow = nools.compile(ruleFilePath);
	var Price = flow.getDefined("price");
	var HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory');
	var HouseInsurance = flow.getDefined("houseInsurance");
	var AgeFired = flow.getDefined("ageFired");
	var SizeFired = flow.getDefined("sizeFired");
	var ValueFired = flow.getDefined("valueFired");
	var CoversFired = flow.getDefined("CoversFired");


	var session = flow.getSession();
	session.assert(new AgeFired(false));
	session.assert(new SizeFired(false));
	session.assert(new ValueFired(false));
	session.assert(new CoversFired(false));

	//var us = {sport:{name:"fudbal",coefficient:0.75},age:66};
	//var totalPrice = assertFacts(us,function(result){
	//	console.log(result);
	//});
	var price = new Price(1000);
	session.assert(price);
	var covers = [];

	for(var i=0; i<houseInsurance.body.coveredByInsurance.length; i++){
	HouseInsuranceCategory.findById(houseInsurance.body.coveredByInsurance[i]).exec(function(err,category){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(houseInsurance.body.coveredByInsurance)
	      	covers.push(category.riskFactor);
	      	if(covers.length==houseInsurance.body.coveredByInsurance.length)
	      		otherStuff();
	     
	    }

	  });
}

	function otherStuff(){
	var age = houseInsurance.body.age;
	var size = houseInsurance.body.size;
	var value = houseInsurance.body.estimatedValue; 
	//session.assert(new Message("goodbye"));
	session.assert(new HouseInsurance(size,age,value,covers));

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
