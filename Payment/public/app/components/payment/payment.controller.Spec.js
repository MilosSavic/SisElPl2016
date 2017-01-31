describe("Payment", function() {
	var paymCtrl, Payment, $httpBackend;
	var appUrl = "https://localhost:8000/api";

	beforeEach(module("payment-app"));


	beforeEach(module(function($urlRouterProvider) {
  		$urlRouterProvider.deferIntercept();
	}));
	


	beforeEach(inject(function( _Payment_, _$httpBackend_) {
		Payment = _Payment_;
		$httpBackend = _$httpBackend_;
		
	}));

	it("should request all payments endpoints", function() {

		$httpBackend.expectGET(appUrl + "/payments").respond({results:[],count:0});
		Payment.getPaymentsDB();
		$httpBackend.flush();
	});

	it("should add payment", function() {
		
		$httpBackend.whenGET(appUrl + "/payments").respond({
			results: [{_id:'1'}, {_id:'2'}],
			count: 2
		});
		var payments;
		Payment.getPaymentsDB().then(function(ins) {
			payments = ins;
		}); 
		$httpBackend.flush();
		var numberOfPaymentsBefore = payments.length;

		$httpBackend.expectPOST(appUrl + "/payments").respond("OK");
		Payment.savePaymentDB(new Payment());
		$httpBackend.flush();

		
		expect(payments.length).toBe(numberOfPaymentsBefore + 1);
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingRequest();
    	$httpBackend.verifyNoOutstandingExpectation();
	});
	
});


describe("PaymentController", function() {
	var paymCtrl, Payment;

	
	beforeEach(module("payment-app"));


	/*beforeEach(module(function($provide){
		$provide.factory('Payment', function(){
			return {
				getCarInsuranceChosen: function() {return false;},
				getHouseInsuranceChosen: function() {return false;},
				getInsuranceData: function() {return [{_id:'2'}, {_id:'3'}];},
				addUsers: function(_id) {return 2;},
				setCarInsuranceChosen: function() {return true;},
				setHouseInsuranceChosen: function() {return true;},
			};
		});
	}));*/


	beforeEach(inject(function($controller, _Payment_) {
		Payment = _Payment_;
		paymCtrl = $controller("PaymentController", {
			Payment: Payment
		});
	}));

	
	it("should have some payments at start", function() {
		expect(paymCtrl.payment).toBeDefined();
		expect(paymCtrl.payment.length).toBe(undefined);
	});

	
	it("should call payment service functions", function() {
		spyOn(Payment, "getPaymentsDB");

		paymCtrl.addPayment();

		expect(Payment.getPaymentsDB).toHaveBeenCalled();
	});


});


