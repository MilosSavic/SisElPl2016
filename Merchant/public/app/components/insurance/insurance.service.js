(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.factory('Insurance', Insurance);


	Insurance.$inject = ['$resource'];
	function Insurance($resource) {
		var collectionName = "insurances";
		return $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
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
	  	}
	  	else
	  	{
	  		for(var i=insurance.users.length; i<userNumber; i++)
	  	  		insurance.users.push(new User());
	  	}

	  	
	      console.log(JSON.stringify(insurance));
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
	  ;

	  return {
	    addUsers: addUsers,
	    getInsuranceData: getInsuranceData,
	    addHouseInsurance: addHouseInsurance,
	    addCarInsurance: addCarInsurance,
	    setCarInsuranceChosen : setCarInsuranceChosen,
	    setHouseInsuranceChosen: setHouseInsuranceChosen,
	    getHouseInsuranceChosen : getHouseInsuranceChosen,
	    getCarInsuranceChosen : getCarInsuranceChosen
	  };
	}
})();