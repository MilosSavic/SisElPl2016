(function() {
	"use strict";

	angular
		.module('merchant-app.car-insurance')
		.controller('CarInsuranceController', CarInsuranceController);

	CarInsuranceController.$inject = ['$location','CarInsurance','$state','InsuranceData','SideBar','CarInsuranceService','crTranslator', 'crTranslations','services'];
	function CarInsuranceController($location,CarInsurance,$state,InsuranceData,SideBar,CarInsuranceService,crTranslator,crTranslations,services) {
		var cic = this;
		cic.carInsurance = InsuranceData.getInsuranceData().carInsurance;

		cic.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
        cic.setLanguage = setLanguage;

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            cic.currentLanguage = crTranslations[language].LANGUAGE;
        }

		console.log("SERVISI: ");
		console.log(JSON.stringify(services));
		cic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.addCarInsurance = function() {
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

		cic.serviceSelection = [];
		if(InsuranceData.getInsuranceData().carInsurance.services)

			for(var i=0; i<InsuranceData.getInsuranceData().carInsurance.services.length;i++)
			{
				if(InsuranceData.getInsuranceData().carInsurance.services[i]._id)
				cic.serviceSelection.push(InsuranceData.getInsuranceData().carInsurance.services[i]._id);
				else cic.serviceSelection.push(InsuranceData.getInsuranceData().carInsurance.services[i]);
			}
		//	else hic.houseInsurance.coveredByInsurance = []; 
		//console.log(JSON.stringify(hic.houseInsurance.coveredByInsurance));
		
		

		cic.serviceData = [];
		//CarInsuranceService.get(function(response){
		//	for(var i=0; i<response.carInsuranceServices.length;i++)
		//	{
		//		var obj = {id: response.carInsuranceServices[i]._id,
		//					label: response.carInsuranceServices[i].name,
		//					group: response.carInsuranceServices[i].serviceGroup.toString()};
		//		if(obj.label)
		//		cic.serviceData.push(obj);
		//	}

		//console.log(JSON.stringify(cic.serviceData));	
		//});
		var serviceGroups = [];

		for(var i=0; i<services.carInsuranceServices.length;i++)
			{
				var obj = {id: services.carInsuranceServices[i]._id,
							label: services.carInsuranceServices[i].name,
							labelSer: services.carInsuranceServices[i].nameSer,
							group: services.carInsuranceServices[i].serviceGroup,
							selected: false};
				if(cic.serviceSelection.indexOf(obj.id)>-1)
				{
					obj.selected = true;
				}
				if(serviceGroups.indexOf(services.carInsuranceServices[i].serviceGroup)>-1)
				{
					for(var j=0; j<cic.serviceData.length; j++)
					{
						if(cic.serviceData[j][0].group == services.carInsuranceServices[i].serviceGroup)
						{
							
							if(obj.label || obj.labelSer ) cic.serviceData[j].push(obj);
							break;
						}
					}
				}
				else
				{	
					serviceGroups.push(services.carInsuranceServices[i].serviceGroup);
					var servicesArray = [];
					if(obj.label || obj.labelSer) {
						servicesArray.push(obj);
						cic.serviceData.push(servicesArray);
					}

				}
			}

		cic.updateCarInsurance = function(selectedItem){
			for(var i=0; i<cic.serviceData.length; i++)
			{
				if(cic.serviceData[i][0].group==selectedItem.group)
				{
					for(var j=0; j<cic.serviceData[i].length; j++)
					{
						if(cic.serviceData[i][j].selected)
						{
							if(selectedItem.selected)
							{
								if(selectedItem.id != cic.serviceData[i][j].id)
								{
										cic.serviceData[i][j].selected = false;
										var index = cic.serviceSelection.indexOf(cic.serviceData[i][j].id);
										cic.serviceSelection.splice(index,1);
										break;
								}

							}
						}
					}
					break;
				}

			}
			if(selectedItem.selected)
			{
				cic.serviceSelection.push(selectedItem.id);
			}
			else
			{
				var index = cic.serviceSelection.indexOf(selectedItem.id);
				cic.serviceSelection.splice(index,1);
			}

			cic.carInsurance.services = [];
			for(var i=0; i<cic.serviceSelection.length; i++){
			
			cic.carInsurance.services.push({_id: cic.serviceSelection[i]});
			}
			console.log(JSON.stringify(cic.carInsurance));
			InsuranceData.getInsuranceData().carInsurance.services = cic.carInsurance.services;

		}

		cic.goToMainForm = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.goToCheckboxForm = function(){
			$state.go('main.carInsuranceCheckboxes');
		}

	}
})();