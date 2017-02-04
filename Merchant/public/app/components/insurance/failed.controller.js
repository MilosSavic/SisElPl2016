(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('FailedController', FailedController);


	FailedController.$inject = ['$location','$state','$rootScope','$stateParams'];
	function FailedController($location,$state,$rootScope,$stateParams) {
		var fc = this;
		alert($stateParams.failedOrderId);
		$.get("https://localhost:3000/failed");
	
		
	}
})();

