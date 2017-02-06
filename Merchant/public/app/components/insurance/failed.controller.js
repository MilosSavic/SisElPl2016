(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('FailedController', FailedController);


	FailedController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService'];
	function FailedController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService) {
		var fc = this;
		alert($stateParams.failedOrderId);	

		var emailData = {
			transactionId: $stateParams.successfulOrderId,
			emailText: "Insurance purchase failed.",
			emailSubject: "Insurance purchase"
		}

		var emailService = new EmailService(emailData);
				emailService.$save(function(result){
					alert(JSON.stringify(result));
		})
	
		
	}
})();

