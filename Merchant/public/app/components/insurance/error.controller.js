(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope'];
	function ErrorController($location,$state,$rootScope) {
		var er = this;

		$.get("https://localhost:3000/error");
	
		
	}
})();