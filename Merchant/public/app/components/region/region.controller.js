(function() {
	"use strict";

	angular
		.module('merchant-app.region')
		.controller('RegionController', RegionController);

	RegionController.$inject = ['$location','Region','$state','$window'];
	function RegionController($location,Region,$state, $window) {
		var rc = this;
		rc.region = new Region();

		Region.get(function(response){rc.listOfRegions = response.regions;});

		rc.submitRegion = function(){
			console.log("reg");
			  $state.reload();
			rc.region.$save(success);
			
		}
		function success() {
			console.log("Region added...")
			Region.get(function(response){rc.listOfRegions = response.regions;});
			rc.region = new Region();
			//$state.go('main.regionForm');
		}
	}
})();