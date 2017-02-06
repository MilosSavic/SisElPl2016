(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService'];
	function ErrorController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService) {
		var er = this;
		alert($stateParams.errorOrderId);
		
		var emailData = {
			transactionId: $stateParams.successfulOrderId,
			emailText: "There was an error during insurance purchase.",
			emailSubject: "Insurance purchase"
		}

		var emailService = new EmailService(emailData);
				emailService.$save(function(result){
					alert(result);
		})
	
		
	}
})();