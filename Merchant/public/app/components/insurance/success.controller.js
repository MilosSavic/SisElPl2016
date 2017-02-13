(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('SuccessController', SuccessController);


	SuccessController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService','crTranslator', 'crTranslations'];
	function SuccessController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService,crTranslator, crTranslations) {
		var sc = this;
		alert($stateParams.successfulOrderId);

		var lang=$stateParams.language;
		var jezik;

		if(lang=='Sr'){
			jezik='sr-latn';
		}else{
			jezik='en';
		}

		crTranslator.setLanguage(jezik);
         sc.currentLanguage = crTranslations[jezik].LANGUAGE;

		
		if(jezik=='en'){
			var emailData = {
				transactionId: $stateParams.successfulOrderId,
				emailText: "Transaction completed successfuly",
				emailSubject: "Insurance purchase"
			}
		}else{
			var emailData = {
			transactionId: $stateParams.successfulOrderId,
			emailText: "Transakcija uspesno zavrsena",
			emailSubject: "Kupovina osiguranja"
			}
		}

		var emailService = new EmailService(emailData);
				emailService.$save(function(result){
					alert(JSON.stringify(result));
		})
		
	}
})();