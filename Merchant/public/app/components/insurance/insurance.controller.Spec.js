describe("Insurance", function() {
	var insurCtrl, Insurance, $httpBackend;
	var appUrl = "https://localhost:3000/api";

	beforeEach(module("merchant-app"));


	beforeEach(module(function($urlRouterProvider) {
  		$urlRouterProvider.deferIntercept();
	}));
	


	beforeEach(inject(function( _Insurance_, _$httpBackend_) {
		Insurance = _Insurance_;
		$httpBackend = _$httpBackend_;
		
	}));

	it("should request all insurances endpoints", function() {

		$httpBackend.expectGET(appUrl + "/insurances").respond({results:[],count:0});
		Insurance.getInsurancesDB();
		$httpBackend.flush();
	});

	it("should add insurance", function() {
		
		$httpBackend.whenGET(appUrl + "/insurances").respond({
			results: [{_id:'1'}, {_id:'2'}],
			count: 2
		});
		var insurances;
		Insurance.getInsurancesDB().then(function(ins) {
			insurances = ins;
		}); 
		$httpBackend.flush();
		var numberOfInsurancesBefore = insurances.length;

		$httpBackend.expectPOST(appUrl + "/insurances").respond("OK");
		Insurance.saveInsuranceDB(new Insurance());
		$httpBackend.flush();

		
		expect(insurances.length).toBe(numberOfInsurancesBefore + 1);
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingRequest();
    	$httpBackend.verifyNoOutstandingExpectation();
	});
	
});


describe("InsuranceController", function() {
	var insurCtrl, InsuranceData, scope;

	
	beforeEach(module("merchant-app"));


	beforeEach(module(function($provide){
		$provide.factory('InsuranceData', function(){
			return {
				getCarInsuranceChosen: function() {return false;},
				getHouseInsuranceChosen: function() {return false;},
				getInsuranceData: function() {return [{_id:'2'}, {_id:'3'}];},
				addUsers: function(_id) {return 2;},
				setCarInsuranceChosen: function() {return true;},
				setHouseInsuranceChosen: function() {return true;},
			};
		});
	}));


	beforeEach(inject(function($controller,$rootScope, _InsuranceData_) {
		scope = $rootScope.$new();
		InsuranceData = _InsuranceData_;
		insurCtrl = $controller("InsuranceController", {
			$scope: scope,
			InsuranceData: InsuranceData
		});
	}));

	
	it("should have some insurances at start", function() {
		expect(insurCtrl.insurance).toBeDefined();
		expect(insurCtrl.insurance.length).toBe(2);
		expect(insurCtrl.currentLanguage).toBeDefined();
		expect(insurCtrl.datepickerStart).toBeDefined();
		expect(insurCtrl.datepickerEnd).toBeDefined();
	});

	
	it("should call insurance service functions", function() {
		spyOn(InsuranceData, "addUsers");

		insurCtrl.numberOfUsers = 2;
		insurCtrl.goToUsersForm();


		expect(InsuranceData.addUsers).toHaveBeenCalled();
	});

	it("should call insurance service functions with param", function() {
		spyOn(InsuranceData, "addUsers");
		insurCtrl.numberOfUsers = 1;
		insurCtrl.goToUsersForm();

		expect(InsuranceData.addUsers).toHaveBeenCalledWith(1);
	});

});


