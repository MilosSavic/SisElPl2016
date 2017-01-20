(function() {
	"use strict";

	angular
		.module('merchant-app.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$location','HouseInsuranceCategory','$state','CarInsurance','InsuranceData','SideBar','crTranslator', 'crTranslations'];
	function HouseInsuranceController($location,HouseInsuranceCategory,$state,CarInsurance,InsuranceData,SideBar,crTranslator,crTranslations) {
		if(!SideBar.isHouseActive())
		{
			$state.go('main.insuranceForm');
			return;
		}
		
		var hic = this;
		hic.houseInsurance = InsuranceData.getInsuranceData().houseInsurance;

		hic.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
        hic.setLanguage = setLanguage;

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            hic.currentLanguage = crTranslations[language].LANGUAGE;
        }

		hic.goToCarInsurance = function(){
			if(!InsuranceData.getInsuranceData().carInsurance)
				InsuranceData.addCarInsurance();
			SideBar.setCarActive(true);
			$state.go('main.carInsuranceCheckboxes');
		}

		hic.addHouseInsurance = function() {
			InsuranceData.setHouseInsuranceChosen(true);
			hic.goToCarInsurance();
		};

		function success() {
			console.log("House Insurance added...")
		}

		//hic.houseInsurance.coveredByInsurance = [];

		hic.insuranceSelection = [];
		if(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance)

			for(var i=0; i<InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance.length;i++)
			{
				if(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]._id)
				hic.insuranceSelection.push(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]._id);
				else hic.insuranceSelection.push(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]);
			}
		//	else hic.houseInsurance.coveredByInsurance = []; 
		//console.log(JSON.stringify(hic.houseInsurance.coveredByInsurance));
		
		console.log(JSON.stringify(hic.insuranceSelection));

		hic.insuranceData = [];
		HouseInsuranceCategory.get(function(response){
			for(var i=0; i<response.houseInsuranceCategories.length;i++)
			{
				var obj = {id: response.houseInsuranceCategories[i]._id,
							label: response.houseInsuranceCategories[i].name,
							labelSer: response.houseInsuranceCategories[i].nameSer,
							selected: false};
				if(hic.insuranceSelection.indexOf(obj.id)>-1)
				{
					obj.selected = true;
				}
				if(obj.label || obj.labelSer)
				hic.insuranceData.push(obj);
			}

			
		});


		hic.updateHouseInsurance = function(){
			hic.insuranceSelection = [];
			for(var i=0; i<hic.insuranceData.length; i++)
			{
				if(hic.insuranceData[i].selected)
					hic.insuranceSelection.push(hic.insuranceData[i].id);
			}
			hic.houseInsurance.coveredByInsurance = [];
			for(var i=0; i<hic.insuranceSelection.length; i++){
			
			hic.houseInsurance.coveredByInsurance.push({_id: hic.insuranceSelection[i]});
		}
			console.log(JSON.stringify(hic.houseInsurance));
			InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance = hic.houseInsurance.coveredByInsurance;

		}

		hic.goToMainForm = function(){
			$state.go('main.houseInsuranceForm');
		}

		hic.goToCheckboxForm = function(){
			$state.go('main.houseInsuranceCheckboxes');
		}
		
	}
})();