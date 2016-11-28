(function() {
    "use strict";

    angular
        .module('company-registry.car-insurance')
        .factory('CarInsurance', CarInsurance);

    CarInsurance.$inject = ['$resource'];
    function CarInsurance($resource) {
        var collectionName = "carInsurances";
        return $resource("http://localhost:3000/api/:collectionName/:id",
            {id: "@_id", collectionName: collectionName},
            { update: { method: 'PUT' } });
    }
})();