(function() {
	"use strict";

	angular
		.module('company-registry.region')
		.controller('RegionController', RegionController);

	RegionController.$inject = ['$location','Region','$state'];
	function RegionController($location,Region,$state) {
		var rc = this;
		rc.region = new Region();

		rc.submitRegion = function(){
			rc.region.$save(success);
		}
		function success() {
			console.log("Region added...")
			$location.path('/home');
		}
	}
})();