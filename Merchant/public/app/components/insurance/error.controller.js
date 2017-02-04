(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope','$stateParams'];
	function ErrorController($location,$state,$rootScope,$stateParams) {
		var er = this;
		alert($stateParams.errorOrderId);
		$.get("https://localhost:3000/error");
	
		
	}
})();