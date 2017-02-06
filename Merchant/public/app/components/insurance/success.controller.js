(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('SuccessController', SuccessController);


	SuccessController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService'];
	function SuccessController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService) {
		var sc = this;
		alert($stateParams.successfulOrderId);
		
		var emailData = {
			transactionId: $stateParams.successfulOrderId,
			emailText: "Transaction completed successfuly",
			emailSubject: "Insurance purchase"
		}

		var emailService = new EmailService(emailData);
				emailService.$save(function(result){
					alert(JSON.stringify(result));
		})
		
	}
})();