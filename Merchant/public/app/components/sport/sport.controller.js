(function() {
	"use strict";

	angular
		.module('merchant-app.sport')
		.controller('SportController', SportController);

	SportController.$inject = ['$location','Sport','$state'];
	function SportController($location,Sport,$state) {
		var sc = this;
		sc.sport = new Sport();

		Sport.get(function(response){sc.listOfSports = response.sports;});

		sc.submitSport = function(){
			sc.sport.$save(success);
		}
		function success() {
			console.log("Sport added...")
			Sport.get(function(response){sc.listOfSports = response.sports;});
			sc.sport = new Sport();
		}
	}
})();