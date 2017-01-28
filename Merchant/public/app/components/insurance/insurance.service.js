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


(function() {
	'use strict';

	angular
		.module('merchant-app.insurance')
		.factory('insuranceService', insuranceService);

	insuranceService.$inject = ['$resource'];
	function insuranceService($resource) {
		var insurancesDB = [];
		var insuranceService = $resource("http://localhost:3000/api/insurances/:id", { id: "@_id"}, { update: { method: 'PUT' } });

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
	'use strict';

	angular
		.module('merchant-app.insurance')
		.factory('insuranceServiceInit', insuranceServiceInit);

	function insuranceServiceInit() {
		var insurances = [];
		

		var insuranceServiceInit = {

			getInsurances: getInsurances,
			addInsurance: addInsurance,
			removeInsurance: removeInsurance,
			
		};

		init();

		return insuranceServiceInit;



		function getInsurances() {
			return insurances;
		}

		function addInsurance(insurance) {
			if(insurance._id) {
				insurances.push(insurance);
				return true;
			}
			return false;
		}

		function removeInsurance(_id) {
			var insuranceIndex;
            angular.forEach(insurances, function (insurance, index) {
                if (insurance._id === _id) {
                    insuranceIndex = index;
                }
            });
            if (insuranceIndex >= 0) {
            	insurances.splice(insuranceIndex, 1);
            	return insuranceIndex;
            } else {
            	return -1;
            }
		}

		function init() {

			addInsurance({_id: '1', startDate: '2018-11-30', endDate: '2019-3-11', amount: '10000', region:'Vojvodina', users:'1'});
			addInsurance({_id: '2', startDate: '2018-10-24', endDate: '2019-8-24', amount: '15000', region:'Kosovo', users:'2'});
			addInsurance({_id: '3', startDate: '2018-3-4', endDate: '2019-3-30', amount: '16000', region:'Macva', users:'3'});
			addInsurance({_id: '4', startDate: '2018-5-23', endDate: '2019-7-21', amount: '20000', region:'Sumadija', users:'4'});
			addInsurance({_id: '5', startDate: '2018-6-2', endDate: '2019-11-7', amount: '100000', region:'Katalonija', users:'5'});
		}
	}
})();