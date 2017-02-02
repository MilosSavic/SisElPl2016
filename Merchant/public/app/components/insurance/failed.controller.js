(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('FailedController', FailedController);


	FailedController.$inject = ['$location','$state','$rootScope'];
	function FailedController($location,$state,$rootScope) {
		var fc = this;

		$.get("https://localhost:3000/failed");
	
		
	}
})();

