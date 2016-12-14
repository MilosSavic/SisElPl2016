(function() {
	"use strict";

	angular
		.module('merchant-app.region')
		.controller('RegionController', RegionController);

	RegionController.$inject = ['$location','Region','$state'];
	function RegionController($location,Region,$state) {
		var rc = this;
		rc.region = new Region();

		Region.get(function(response){rc.listOfRegions = response.regions;});

		rc.submitRegion = function(){
			console.log("reg");
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