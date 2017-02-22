"use strict"
module.exports.execute = execute;

//var i = {body:{amount:50000,region:"585012cb27d27e0b80ad1dff",duration:11,numberOfUsers:3,
	//users:[{age:50,sport:"58411ff9e0a20212f8dd8db4"},{age:77,sport:"5851a3bbd55b031f41487e71"}],
//	houseInsurance:{age:35,size:455,estimatedValue:55900,coveredByInsurance:["585026c95eda23124ca18b7e","5851cf33f478070be41d3dd0","5851cf3ef478070be41d3dd1"]},
//	carInsurance: {services:["5850286f5eda23124ca18b82","585028615eda23124ca18b80"]}
//}};
//execute(i, function(result){
//	console.log(result);
//})
function execute(insurance,res){
	logger.info("Request for price calculation. ");
	var mongoose = require('mongoose');
	var nools = require('nools');
	var ruleFilePath = __dirname + "/all-rules.nools";
	var flow = nools.compile(ruleFilePath);
	var Price = flow.getDefined("price");
	var Region = mongoose.model('Region');
	var Amount = mongoose.model('Amount');
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
	var amount = 0;

	var dataPresent = true; 
	var dataPresentMessage = "";
	for(var i=0; i<insurance.body.users.length; i++)
	{
		if(!(insurance.body.users[i].sport && insurance.body.users[i].age))
		{
			console.log(JSON.stringify(insurance.body.users));
			dataPresent = false;
			dataPresentMessage = "User info not present."
			break;
		}
	}

	if(!insurance.body.region){
		dataPresent = false;
		dataPresentMessage = "Region not present."
	}

	if(insurance.body.houseInsurance){
		if(!insurance.body.houseInsurance.coveredByInsurance)
			dataPresent = false;
		else if(!(insurance.body.houseInsurance.coveredByInsurance.length>0))
			dataPresent = false;
		if(!insurance.body.houseInsurance.age)
			dataPresent = false;
		if(!insurance.body.houseInsurance.size)
			dataPresent = false;
		if(!insurance.body.houseInsurance.estimatedValue)
			dataPresent = false;
	}

	if(!insurance.body.startDate){
		dataPresentMessage = "Start date not present."
		dataPresent = false;
	}

	if(!insurance.body.endDate){
		dataPresentMessage = "End date not present."
		dataPresent = false;
	}

	if(!insurance.body.amount){
		dataPresentMessage = "Amount not present."
		dataPresent = false;
	}

	if(insurance.body.carInsurance){
		if(!insurance.body.carInsurance.services)
			dataPresent = false;
		else if(!(insurance.body.carInsurance.services.length>0))
			dataPresent = false;
	}

	if(!insurance.body.numberOfUsers){
		dataPresentMessage = "Number of users not present."
		dataPresent = false;
	}

	if(!dataPresent){
		nools.deleteFlows();
		return res.status(400).send({
			message: "Bad request, not enough data"+dataPresentMessage
		})
	}



	Region.findById(insurance.body.region._id).exec(function(err,region){
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
		if(user.sport)
		var userSport = user.sport._id;
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
	      		findAmount();
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
	      		else findAmount();
	      	}
	     
	    }

	  });
}
	}
	function findCarInsuranceServices(){
		if(insurance.body.carInsurance.services)
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
	      		findAmount();
	     
	    }

	  });
	}
	else findAmount();
	}
	
	function findAmount(){
		
		Amount.findById(insurance.body.amount._id).exec(function(err,result){
	    if(err)
	    {
	      return res.status(400).send({
	        message: "Error"
	      });
	    }else {
	      amount = result.amount;
	      otherStuff();
	    }

	  });
		
	}

	function otherStuff(){
		//DEFINISEMO OSNOVNU CENU ZA KORISNIKA
    var userPrice = 100;
	var numberOfUsers = insurance.body.numberOfUsers;
	var startDate = new Date(insurance.body.startDate);
	var endDate = new Date(insurance.body.endDate);
	//milliseconds to days
	var duration = (endDate-startDate)/1000/60/60/24;
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
	var houseInsurance;
	if(insurance.body.houseInsurance){
	var age = insurance.body.houseInsurance.age;
	var size = insurance.body.houseInsurance.size;
	var value = insurance.body.houseInsurance.estimatedValue; 
	//session.assert(new Message("goodbye"));
	houseInsurance = new HouseInsurance(size,age,value,covers,0);
	}
	//da li je ovo ok?
	else houseInsurance = new HouseInsurance(0,0,0,[0],0);
	
	session.assert(houseInsurance);
	//CAR INSURANCE
	var carInsurance;
	if(insurance.body.carInsurance){
		carInsurance = new CarInsurance(services);
	}
	//da li je ovo ok?
	else carInsurance = new CarInsurance([0]);
	
	session.assert(carInsurance);

	session.match(function(err){
	    if(err){
	        logger.error(err.stack);
	    }else{
	        logger.info("Calculating price done");
	        nools.deleteFlows();
			logger.debug('House insurance'+houseInsurance.houseInsurancePrice);
			logger.debug('Car insurance'+carInsurance.carInsurancePrice);
			//for frontend
			price.houseInsurancePrice = houseInsurance.houseInsurancePrice*amount/1000*duration/1000;
			price.carInsurancePrice = carInsurance.carInsurancePrice*amount/1000*duration/1000;
			price.value = price.value/1000;
			price.basePrice = price.value-price.carInsurancePrice-price.houseInsurancePrice;
			logger.info("Price calculated. Response sent. Status: 200")
	      	res.json(price);
	    }
	})
	}

}