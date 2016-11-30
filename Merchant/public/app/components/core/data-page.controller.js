(function() {
	"use strict";
	
	angular
		.module('company-registry.core')
		.controller('DataPageController', DataPageController);

	DataPageController.$inject = ['$location','SideBar','$scope','$state','InsuranceData','Region'];
	function DataPageController($location,SideBar,$scope,$state,InsuranceData,Region) {
		var dpc = this;
		
		var insurance = JSON.parse(JSON.stringify(InsuranceData.getInsuranceData()));
		var startDate = new Date(insurance.startDate);
		startDate.setHours(startDate.getHours()+1);
		var endDate = new Date(insurance.endDate);
		endDate.setHours(endDate.getHours()+1);
		dpc.startDate = startDate.toDateString();
		dpc.endDate = endDate.toDateString();
		dpc.value = insurance.value;
		Region.get({regionId: insurance.region._id},function(response){
			dpc.region = response.name;
		});
		dpc.users = insurance.users;

		if(!InsuranceData.getHouseInsuranceChosen())
		{
			insurance.houseInsurance = undefined;
		}

		if(!InsuranceData.getCarInsuranceChosen())
		{
			insurance.carInsurance = undefined;
		}

		if(insurance.houseInsurance)
		{
			dpc.houseInsuranceChosen = true;
		}
		else
		{
			dpc.houseInsuranceChosen = false;
		}

		if(insurance.carInsurance)
		{
			dpc.carInsuranceChosen = true;
		}
		else
		{
			dpc.carInsuranceChosen = false;
		}

		dpc.cancelHouseInsurance = function(){
			insurance.houseInsurance = undefined;
			InsuranceData.setHouseInsuranceChosen(false);
			dpc.houseInsuranceChosen = false;
		}

		dpc.cancelCarInsurance = function(){
			insurance.carInsurance = undefined;
			InsuranceData.setCarInsuranceChosen(false);
			dpc.carInsuranceChosen = false;
		}
		
	}
})();