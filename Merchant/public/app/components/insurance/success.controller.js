(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('SuccessController', SuccessController);


	SuccessController.$inject = ['$location','$state','$rootScope','$stateParams'];
	function SuccessController($location,$state,$rootScope,$stateParams) {
		var sc = this;
		alert($stateParams.successfulOrderId);
		$.get("https://localhost:3000/success");
	
		
	}
})();