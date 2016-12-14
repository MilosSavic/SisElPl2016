(function() {
	"use strict";

	angular
		.module('payment-app.shared')
		.directive('uniqueField', uniqueField);

	uniqueField.$inject = ['$q', '$parse'];
	function uniqueField($q, $parse) {
		var uniqueFieldDirective = {
			restrict: 'A',
			//Pristupamo kontrolerima ngModel i busyIndicator(ako postoji)
			require: ['ngModel','?^busyIndicator'],
			link: function(scope, elem, attrs, ctrls) {
				var ngModelCtrl = ctrls[0];
				var busyIndicatorCtrl = ctrls[1];

				//ovo je funkcija koju smo naveli kao vrednost atributa unique-field
				var expfn = $parse(attrs.uniqueField); //koristimo $parse da transformišemo tekst "ec.uniqueField(value)" u pravu funkciju

				ngModelCtrl.$asyncValidators.uniqueField = function(value) {
					if(!value || value === '') return $q.when(true);
					//funkciji prosleđujemo context (scope) u kom se izvršava i proširujemo ga parametrima i izvršavamo funkciju
					return expfn(scope, {'value':value}).then(function(data) {
						if(data.count > 0) {
							return $q.reject('exists');
						} else {
							return true;
						};
					});
				};

				if (busyIndicatorCtrl) {
	                scope.$watch(function () { return ngModelCtrl.$pending; }, function (newValue) {
	                    if (newValue) busyIndicatorCtrl.show();
	                    else busyIndicatorCtrl.hide();
	                });
	            }
			}
		};
		return uniqueFieldDirective;
	}
})();