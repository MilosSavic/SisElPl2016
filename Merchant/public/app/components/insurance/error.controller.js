(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('ErrorController', ErrorController);


	ErrorController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User'];
	function ErrorController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User) {
		var er = this;
		alert($stateParams.errorOrderId);
		

		er.idTransakcije = [];
		er.brojKorisnika = [];


		Transaction.get(function(response){
			for(var i=0; i<response.transactions.length;i++)
			{

			if($stateParams.errorOrderId == response.transactions[i].idNumber){

				er.idTransakcije.push(response.transactions[i]._id);
				break;
			}
			}

			
		});

		Insurance.query(function(response){
			for(var i=0; i<response.length;i++)
			{

			if(response[i].transaction==er.idTransakcije[0]){
				
				for(var j=0; j<response[i].users.length;j++){
					
					er.brojKorisnika.push(response[i].users[j]);
				}
					
				break;
			}
			}
			
			
		});

		User.get(function(response){

			for(var i=0; i<response.users.length;i++)
			{
				
				for(var j=0; j<er.brojKorisnika.length;j++){
					if(response.users[i]._id == er.brojKorisnika[j]){
						console.log("Email "+response.users[i].email);

						$.get("https://localhost:3000/error",{send:response.users[i].email});
						
					}

				}
			
			}

			
		});
	
		
	}
})();