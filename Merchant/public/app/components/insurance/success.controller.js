(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('SuccessController', SuccessController);


	SuccessController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User'];
	function SuccessController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User) {
		var sc = this;
		alert($stateParams.successfulOrderId);

		sc.idTransakcije = [];
		sc.brojKorisnika = [];


		Transaction.get(function(response){
			for(var i=0; i<response.transactions.length;i++)
			{

			if($stateParams.successfulOrderId == response.transactions[i].idNumber){

				sc.idTransakcije.push(response.transactions[i]._id);
				break;
			}
			}

			
		});

		Insurance.query(function(response){
			for(var i=0; i<response.length;i++)
			{

			if(response[i].transaction==sc.idTransakcije[0]){
				
				for(var j=0; j<response[i].users.length;j++){
					
					sc.brojKorisnika.push(response[i].users[j]);
				}
					
				break;
			}
			}
			
			
		});

		User.get(function(response){

			for(var i=0; i<response.users.length;i++)
			{
				
				for(var j=0; j<sc.brojKorisnika.length;j++){
					if(response.users[i]._id == sc.brojKorisnika[j]){
						console.log("Email "+response.users[i].email);

						$.get("https://localhost:3000/success",{send:response.users[i].email});
							
					}

				}
			
			}

			
		});

		
		
	
		
	}
})();