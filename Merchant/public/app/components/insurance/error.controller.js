(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService'];
	function ErrorController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService) {
		var er = this;
		const DATABASE_CONN_ERROR = 1;
		
		
		var emailData = {
			transactionId: $stateParams.errorOrderId,
			emailText: "There was an error during insurance purchase.",
			emailSubject: "Insurance purchase"
		}
		
		
		if($stateParams.errorOrderId == DATABASE_CONN_ERROR)
		{
			er.message = "Couldn't connect to database. Please try again later."
		}
		else {
			var emailService = new EmailService(emailData);
			emailService.$save(function(result){
				alert(JSON.stringify(result));
			})
		}
		
	}
})();