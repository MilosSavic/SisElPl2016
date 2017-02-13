(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService','crTranslator', 'crTranslations'];
	function ErrorController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService,crTranslator, crTranslations) {
		var er = this;
		const DATABASE_CONN_ERROR = 1;

		var lang=$stateParams.language;
		var jezik;

		if(lang=='Sr'){
			jezik='sr-latn';
		}else{
			jezik='en';
		}

		crTranslator.setLanguage(jezik);
        er.currentLanguage = crTranslations[jezik].LANGUAGE;


	
		
		
		if(jezik=='en'){
			var emailData = {
				transactionId: $stateParams.errorOrderId,
				emailText: "There was an error during insurance purchase.",
				emailSubject: "Insurance purchase"
			}
		}else{
			var emailData = {
				transactionId: $stateParams.errorOrderId,
				emailText: "Doslo je do greške prilikom kupovine osiguranja.",
				emailSubject: "Kupovina osiguranja"
			}

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