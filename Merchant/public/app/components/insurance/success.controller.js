(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('SuccessController', SuccessController);


	SuccessController.$inject = ['$location','$state','$rootScope'];
	function SuccessController($location,$state,$rootScope) {
		var sc = this;

		$.get("https://localhost:3000/success");
	
		
	}
})();