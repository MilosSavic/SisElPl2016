(function() {
	"use strict";

	angular
		.module('company-registry.car-insurance')
		.controller('CarInsuranceController', CarInsuranceController);

	CarInsuranceController.$inject = ['$location','CarInsurance','$state','InsuranceData','SideBar'];
	function CarInsuranceController($location,CarInsurance,$state,InsuranceData,SideBar) {
		var cic = this;
		cic.carInsurance = InsuranceData.getInsuranceData().carInsurance;

		cic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.addCarInsurance = function() {
			console.log('savee');
			cic.carInsurance.$save(success);
			InsuranceData.setCarInsuranceChosen(true);
			cic.goToFinalPage();
		}

		cic.goToFinalPage = function(){
			SideBar.setDataActive(true);
			$state.go('main.dataPage');
		}

		function success() {
			console.log("Car Insurance added...")
			//VAZNO: ovo (ili nesto slicno) uraditi svuda gde je neophodno
			//ovo se radi kako bi se omogucilo visestruko memorisanje bez resetovanja cele forme
			//obratiti paznju kasnije i na suvisne objekte u bazi
			delete cic.carInsurance._id;
			console.log(JSON.stringify(cic.carInsurance));
		}
	}
})();