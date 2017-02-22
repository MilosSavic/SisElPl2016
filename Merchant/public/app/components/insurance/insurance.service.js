(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.factory('Insurance', Insurance);


	Insurance.$inject = ['$resource'];
	function Insurance($resource) {
		var insurancesDB = [];
		var collectionName = "insurances";
		var insuranceService= $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });

		

		angular.extend(insuranceService, {
			saveInsuranceDB: saveInsuranceDB,
			getInsurancesDB: getInsurancesDB,
		});

		return insuranceService;

		function saveInsuranceDB(insurance) {
			if(insurance._id) {
				return insurance.$update().then(function(data) {
					insurancesDB.push(data);
				});
			} else {
				return insurance.$save().then(function(data) {
					insurancesDB.push(data);
				});
			}
		}

		function getInsurancesDB() {
			return insuranceService.get().$promise.then(function(data) {
				insurancesDB = data.results;
				return insurancesDB;
			});
		}
	}

})();

(function() {
	"use strict";

	
		angular
		.module('merchant-app.insurance')
		.factory('InsuranceData', InsuranceData);
	InsuranceData.$inject = ['Insurance','User','HouseInsurance','CarInsurance'];
	function InsuranceData(Insurance,User,HouseInsurance,CarInsurance){
	  var insurance = new Insurance();
	  var carInsuranceChosen = false;
	  var houseInsuranceChosen = false;



	  var addUsers = function(userNumber) {
	  	if(!insurance.users)
	  		insurance.users = [];
	  	if(userNumber<insurance.users.length)
	  	{
	  		for(var i=insurance.users.length-1; i>=userNumber;i--)
	  		{
	  			insurance.users.splice(i,1);
	  		}
	  		for(var i=0; i<usersValidity.length; i++)
	  		{
	  			if(usersValidity[i].index>userNumber)
	  				usersValidity.splice(i,1);
	  		}
	  	}
	  	else
	  	{
	  		for(var i=insurance.users.length; i<userNumber; i++)
	  	  		insurance.users.push(new User());
	  	}

	  	
	 //     console.log(JSON.stringify(insurance));
	  };

	  var addHouseInsurance = function() {
	  	insurance.houseInsurance = new HouseInsurance();
	  }

	  var addCarInsurance = function(){
	  	insurance.carInsurance = new CarInsurance();
	  }

	  var getInsuranceData = function(){
	      return insurance;
	  }
	  
	  var setInsuranceData = function(_insurance){
		  var ins = new Insurance(_insurance);
		  var regionId = ins.region;
		  ins.region = {};
		  ins.region._id = regionId;
		  var amountId = ins.amount;
		  ins.amount = {};
		  ins.amount._id = amountId;
		  ins.users = [];
		  ins.startDate = new Date(ins.startDate);
		  ins.endDate = new Date(ins.endDate);
		  for(var i=0; i<_insurance.users.length; i++)
		  {
			
			User.get({userId: _insurance.users[i]},function(response){
				var sportId = response.sport;
				response.sport = {};
				response.sport._id = sportId;
				var newUser = new User(response);
				newUser._id = undefined;
				ins.users.push(newUser);
							
			})
			
		  }  
		  
		  insurance = ins;
		  
		  if(ins.houseInsurance)
		  {
			 setHouseInsuranceChosen(true); 
			 HouseInsurance.get({id: ins.houseInsurance},function(response){
				 if(response){
				 var newHouseInsurance = new HouseInsurance(response);
				 newHouseInsurance._id = undefined;
				 insurance.houseInsurance = newHouseInsurance;
				
				 }
			 })
		  }
		  else addHouseInsurance();
		  
		  if(ins.carInsurance)
		  {
			  setCarInsuranceChosen(true);
			  CarInsurance.get({id: ins.carInsurance},function(response){
				 if(response){
				 var newCarInsurance = new CarInsurance(response);
				 newCarInsurance._id = undefined;
				 insurance.carInsurance = newCarInsurance;
				 
				 }
			 })
		  }
		  else addCarInsurance();
		  
		  insurance._id = undefined;
		  
		  
		  if(insurance.houseInsurance._id)
			  insurance.houseInsurance._id = undefined;
		  if(insurance.carInsurance._id)
			  insurance.carInsurance._id = undefined;
		  
	  }

	  var setCarInsuranceChosen = function(chosen){
	  	carInsuranceChosen = chosen;
	  }

	  var getCarInsuranceChosen = function(){
	  	return carInsuranceChosen;
	  }

	  var setHouseInsuranceChosen = function(chosen){
	  	houseInsuranceChosen = chosen;
	  }

	  var getHouseInsuranceChosen = function(){
	  	return houseInsuranceChosen;
	  }
	  var usersValidity = [];

	  var setUserValidity = function(userIndex,validity){
	  	var found = false;
	  	for(var i=0; i<usersValidity.length; i++)
	  	{
	  		if(usersValidity[i].index == userIndex)
	  			{
	  				usersValidity[i].valid = validity;
	  				return;
	  			}
	  	}
	  	usersValidity.push({index: userIndex, valid: validity});
	  }

	  var getValidUserCount = function(){
	  	var counter = 0;
	  	for (var i = 0; i<usersValidity.length; i++)
	  	{
	  		if(usersValidity[i].valid == true)
	  			counter++;
	  	}
	  	return counter;
	  }

	  var removeUserValidity = function(){
	  	for(var i=0; i<usersValidity.length; i++)
	  	{
	  		if(usersValidity[i].index == usersValidity.length)
	  		{
	  			usersValidity.splice(i,1);
	  			break;
	  		}
	  	}
	  }

	  
	  return {
	    addUsers: addUsers,
	    getInsuranceData: getInsuranceData,
		setInsuranceData: setInsuranceData,
	    addHouseInsurance: addHouseInsurance,
	    addCarInsurance: addCarInsurance,
	    setCarInsuranceChosen : setCarInsuranceChosen,
	    setHouseInsuranceChosen: setHouseInsuranceChosen,
	    getHouseInsuranceChosen : getHouseInsuranceChosen,
	    getCarInsuranceChosen : getCarInsuranceChosen,
	    setUserValidity: setUserValidity,
	    getValidUserCount: getValidUserCount,
	    removeUserValidity: removeUserValidity
	  };
	}
})();


