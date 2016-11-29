(function() {
	"use strict";
	
	angular
		.module('company-registry.core')
		.controller('DataPageController', DataPageController);

	DataPageController.$inject = ['$location','SideBar','$scope','$state','InsuranceData'];
	function DataPageController($location,SideBar,$scope,$state,InsuranceData) {
		var dpc = this;
		
		var insurance = JSON.parse(JSON.stringify(InsuranceData.getInsuranceData()));
		var startDate = new Date(insurance.startDate);
		startDate.setHours(startDate.getHours()+1);
		var endDate = new Date(insurance.endDate);
		endDate.setHours(endDate.getHours()+1);
		dpc.startDate = startDate.toDateString();
		dpc.endDate = endDate.toDateString();

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
			dpc.houseInsuranceChosen = "Yes";
		}
		else
		{
			dpc.houseInsuranceChosen = "No";
		}

		if(insurance.carInsurance)
		{
			dpc.carInsuranceChosen = "Yes";
		}
		else
		{
			dpc.carInsuranceChosen = "No";
		}
		
	}
})();