describe("insuranceService", function() {
	var insurCtrl, insuranceService, $httpBackend;
	var appUrl = "http://localhost:3000/api";

	//pre svakog testa učitavamo app modul
	beforeEach(module("merchant-app"));


	beforeEach(module(function($urlRouterProvider) {
  		$urlRouterProvider.deferIntercept();
	}));
	

	//pre svakog testa "ubrizgavamo" $controller i mock insuranceService i definišemo kontroler
	beforeEach(inject(function( _insuranceService_, _$httpBackend_) {
		insuranceService = _insuranceService_;
		$httpBackend = _$httpBackend_;
		
	}));

	it("should request all insurances endpoints", function() {
		//očekujemo da će se izvršiti 1 HTTP GET zahtev na dati URL
		$httpBackend.expectGET(appUrl + "/insurances").respond({results:[],count:0});
		insuranceService.getInsurancesDB();
		$httpBackend.flush();
	});

	it("should add insurance", function() {
		//ako i kad se izvrši HTTP get zahtev na dati URL definišemo odgovor da bude [{_id:'1'}, {_id:'2'}]
		$httpBackend.whenGET(appUrl + "/insurances").respond({
			results: [{_id:'1'}, {_id:'2'}],
			count: 2
		});
		var insurances;
		insuranceService.getInsurancesDB().then(function(ins) {
			insurances = ins;
		}); //bitno je staviti whenGET iznad
		$httpBackend.flush();
		var numberOfInsurancesBefore = insurances.length;

		//očekujemo da će se izvršiti HTTP post zatev na dati URL
		$httpBackend.expectPOST(appUrl + "/insurances").respond("OK");
		insuranceService.saveInsuranceDB(new insuranceService());
		$httpBackend.flush();

		//da bi shvatili zašto se promena desila potrebno je pogledati implementaciju save metode u insurance.service.js
		expect(insurances.length).toBe(numberOfInsurancesBefore + 1);
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingRequest();
    	$httpBackend.verifyNoOutstandingExpectation();
	});
	
});


describe("InsControllerInit", function() {
	var insurCtrl, insuranceServiceInit;

	//pre svakog testa učitavamo app modul
	beforeEach(module("merchant-app"));

	//pre svakog testa učitavamo mock insuranceService servis sa datom implementacijom
	beforeEach(module(function($provide){
		$provide.factory('insuranceServiceInit', function(){
			return {
				addInsurance: function() {return false;},
				removeInsurance: function(_id) {return false;},
				getInsurances: function() {return [{_id:'2'}, {_id:'3'}];}
			};
		});
	}));

	//pre svakog testa "ubrizgavamo" $controller i mock insuranceService i definišemo kontroler
	beforeEach(inject(function($controller, _insuranceServiceInit_) {
		insuranceServiceInit = _insuranceServiceInit_;
		insurCtrl = $controller("InsControllerInit", {
			insuranceServiceInit: insuranceServiceInit
		});
	}));

	
	it("should have some insurances at start", function() {
		expect(insurCtrl.insurances).toBeDefined();
		expect(insurCtrl.insurances.length).toBe(2);
	});

	
	it("should call insurance service functions", function() {
		spyOn(insuranceServiceInit, "addInsurance");

		insurCtrl.saveInsurance();

		expect(insuranceServiceInit.addInsurance).toHaveBeenCalled();
	});

	it("should call insurance service functions with param", function() {
		spyOn(insuranceServiceInit, "addInsurance");
		insurCtrl.insurance = {_id:'6', amount:'2000'};
		insurCtrl.saveInsurance();

		expect(insuranceServiceInit.addInsurance).toHaveBeenCalledWith({_id:'6', amount:'2000'});
	});

	it("should call insurance service function and receive custom return value", function() {
		spyOn(insuranceServiceInit, "addInsurance").and.returnValue(5);
		insurCtrl.insurance = {_id:'7', amount:'5000'};

		expect(insurCtrl.lastSaveSuccess).toBe(true);
		insurCtrl.saveInsurance();

		expect(insurCtrl.lastSaveSuccess).toBe(5);
	});
});


