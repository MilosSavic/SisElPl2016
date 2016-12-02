(function() {
	"use strict";

	angular
		.module('company-registry.sport')
		.controller('SportController', SportController);

	SportController.$inject = ['$location','Sport','$state'];
	function SportController($location,Sport,$state) {
		var sc = this;
		sc.sport = new Sport();

		Sport.get(function(response){sc.listOfSports = response.sports;});

		sc.submitRegion = function(){
			sc.sport.$save(success);
		}
		function success() {
			console.log("Sport added...")
			Sport.get(function(response){sc.listOfSports = response.sports;});
			sc.sport = new Sport();
		}
	}
})();