(function() {
	"use strict";

	angular
		.module('merchant-admin-app.sport')
		.controller('SportController', SportController);

	SportController.$inject = ['$location','Sport','$state','$window'];
	function SportController($location,Sport,$state,$window) {
		var sc = this;
		sc.sport = new Sport();

		Sport.get(function(response){sc.listOfSports = response.sports;});

		sc.submitSport = function(){
			 $window.location.reload();
			sc.sport.$save(success);
		}
		function success() {
			console.log("Sport added...")
			Sport.get(function(response){sc.listOfSports = response.sports;});
			sc.sport = new Sport();
		}
	}
})();