"use strict"
module.exports.execute = execute;

var i = {body:{amount:50000,region:"585012cb27d27e0b80ad1dff",duration:11,numberOfUsers:3,
	users:[{age:50,sport:"58411ff9e0a20212f8dd8db4"},{age:77,sport:"5851a3bbd55b031f41487e71"}],
	houseInsurance:{age:35,size:455,estimatedValue:55900,coveredByInsurance:["585026c95eda23124ca18b7e","5851cf33f478070be41d3dd0","5851cf3ef478070be41d3dd1"]},
	carInsurance: {services:["5850286f5eda23124ca18b82","585028615eda23124ca18b80"]}
}};
execute(i, function(result){
	console.log(result);
})
function execute(insurance,result){
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/all-rules.nools";
	var flow = nools.compile(ruleFilePath);
	var Price = flow.getDefined("price");
	var Region = mongoose.model('Region');
	var HouseInsurance = flow.getDefined("houseInsurance");
	var AmountFired = flow.getDefined("amountFired");
	var RegionRiskFired = flow.getDefined("regionRiskFired");
	var DurationFired = flow.getDefined("durationFired");
	var NumberOfUsersFired = flow.getDefined("numberOfUsersFired");
	var Insurance = flow.getDefined("insurance");
	
	//USERS
	var Sport = mongoose.model('Sport');
	var User = flow.getDefined("user");
	var UserAgeFired = flow.getDefined("userAgeFired");
	var RiskFired = flow.getDefined("riskFired");
	var Users = flow.getDefined("users");

	//HOME INSURANCE
	var HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory');
	var HouseInsurance = flow.getDefined("houseInsurance");
	var AgeFired = flow.getDefined("ageFired");
	var SizeFired = flow.getDefined("sizeFired");
	var ValueFired = flow.getDefined("valueFired");
	var CoversFired = flow.getDefined("CoversFired");

	//CAR INSURANCE

	var CarInsuranceService = mongoose.model('CarInsuranceService');
	var CarInsurance = flow.getDefined("carInsurance");
	var ServicesFired = flow.getDefined("ServicesFired");



	


	var session = flow.getSession();
	session.assert(new AmountFired(false));
	session.assert(new RegionRiskFired(false));
	session.assert(new DurationFired(false));
	session.assert(new NumberOfUsersFired(false));

	session.assert(new UserAgeFired(false));
	session.assert(new RiskFired(false));

	//HOME INSURANCE
	session.assert(new AgeFired(false));
	session.assert(new SizeFired(false));
	session.assert(new ValueFired(false));
	session.assert(new CoversFired(false));

	//CAR INSURANCE
	session.assert(new ServicesFired(false));

	var price = new Price(0);
	session.assert(price);
	var regionRisk = -404;
	var users = [];
	var covers = [];
	var services = [];
	Region.findById(insurance.body.region).exec(function(err,region){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(insurance.body.region)
	      	regionRisk = region.risk;
	      	findSportRisks();
	     
	    }

	  });

	function findSportRisks(){
	insurance.body.users.forEach(function(user){
		var userSport = user.sport;
		Sport.findById(userSport).exec(function(err,sport){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(userSport)
	     	 users.push({age: user.age,sportRisk: sport.coefficient})
	     	if(users.length==insurance.body.users.length){
	     	if(insurance.body.houseInsurance)
	      	findHouseInsuranceCategories();
	      	else if(insurance.body.carInsurance){
	      		findCarInsuranceServices();
	      	}
	      	else {
	      		otherStuff();
	      	}
	  		}
	    }

	  });
	})
	}

	function findHouseInsuranceCategories(){

	for(var i=0; i<insurance.body.houseInsurance.coveredByInsurance.length; i++){
	HouseInsuranceCategory.findById(insurance.body.houseInsurance.coveredByInsurance[i]).exec(function(err,category){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(insurance.body.houseInsurance.coveredByInsurance)
	      	covers.push(category.riskFactor);
	      	if(covers.length==insurance.body.houseInsurance.coveredByInsurance.length){
	      		if(insurance.body.carInsurance)
	      		findCarInsuranceServices();
	      		else otherStuff();
	      	}
	     
	    }

	  });
}
	}
	function findCarInsuranceServices(){
		for(var i=0; i<insurance.body.carInsurance.services.length; i++){
		CarInsuranceService.findById(insurance.body.carInsurance.services[i]).exec(function(err,category){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	    	//zasto err ne bude definisan?
	    	if(insurance.body.carInsurance.services)
	      	services.push(category.riskFactor);
	      	if(services.length==insurance.body.carInsurance.services.length)
	      		otherStuff();
	     
	    }

	  });
}
	}

	function otherStuff(){
		//DEFINISEMO OSNOVNU CENU ZA KORISNIKA
    var userPrice = 100;
	var amount = insurance.body.amount;
	var numberOfUsers = insurance.body.numberOfUsers;
	var duration = insurance.body.duration; 
	var usersFromFlow = [];
	for(var i=0; i<users.length; i++)
	{	
		var userToAssert = new User(users[i].sportRisk,users[i].age,false,false,userPrice);
		usersFromFlow.push(userToAssert);
		session.assert(userToAssert);
	}
	if(usersFromFlow.length==users.length)
	{
		session.assert(new Users(usersFromFlow));
	}
	
	//session.assert(new Message("goodbye"));
	session.assert(new Insurance(regionRisk,amount,duration,numberOfUsers));


	//HOME INSURANCE
	if(insurance.body.houseInsurance){
	var age = insurance.body.houseInsurance.age;
	var size = insurance.body.houseInsurance.size;
	var value = insurance.body.houseInsurance.estimatedValue; 
	//session.assert(new Message("goodbye"));
	session.assert(new HouseInsurance(size,age,value,covers,0));
	}
	//da li je ovo ok?
	else session.assert(new HouseInsurance(0,0,0,[0],0));
	//CAR INSURANCE
	if(insurance.body.carInsurance)
		session.assert(new CarInsurance(services));
	//da li je ovo ok?
	else session.assert(new CarInsurance([0]));

	session.match(function(err){
	    if(err){
	        console.error(err.stack);
	    }else{
	        console.log("done");
	        nools.deleteFlows();
	      	result(price);
	    }
	})
	}

}