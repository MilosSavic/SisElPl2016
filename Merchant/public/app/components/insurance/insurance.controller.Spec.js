describe("InsController", function() {
	var insurCtrl, insuranceService;

	//pre svakog testa učitavamo app modul
	beforeEach(module("merchant-app"));

	//pre svakog testa učitavamo mock insuranceService servis sa datom implementacijom
	beforeEach(module(function($provide){
		$provide.factory('insuranceService', function(){
			return {
				addInsurance: function() {return false;},
				removeInsurance: function(_id) {return false;},
				getInsurances: function() {return [{_id:'2'}, {_id:'3'}];}
			};
		});
	}));

	//pre svakog testa "ubrizgavamo" $controller i mock insuranceService i definišemo kontroler
	beforeEach(inject(function($controller, _insuranceService_) {
		insuranceService = _insuranceService_;
		insurCtrl = $controller("InsController", {
			insuranceService: insuranceService
		});
	}));

	
	it("should have some insurances at start", function() {
		expect(insurCtrl.insurances).toBeDefined();
		expect(insurCtrl.insurances.length).toBe(2);
	});

	
	it("should call insurance service functions", function() {
		spyOn(insuranceService, "addInsurance");

		insurCtrl.saveInsurance();

		expect(insuranceService.addInsurance).toHaveBeenCalled();
	});

	it("should call insurance service functions with param", function() {
		spyOn(insuranceService, "addInsurance");
		insurCtrl.insurance = {_id:'6', amount:'2000'};
		insurCtrl.saveInsurance();

		expect(insuranceService.addInsurance).toHaveBeenCalledWith({_id:'6', amount:'2000'});
	});

	it("should call insurance service function and receive custom return value", function() {
		spyOn(insuranceService, "addInsurance").and.returnValue(5);
		insurCtrl.insurance = {_id:'7', amount:'5000'};

		expect(insurCtrl.lastSaveSuccess).toBe(true);
		insurCtrl.saveInsurance();

		expect(insurCtrl.lastSaveSuccess).toBe(5);
	});
});