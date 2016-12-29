(function() {
    "use strict";

    angular
        .module('merchant-app.car-insurance')
        .factory('CarInsurance', CarInsurance);

    CarInsurance.$inject = ['$resource'];
    function CarInsurance($resource) {
        var collectionName = "carInsurances";
        return $resource("https://localhost:3000/api/:collectionName/:id",
            {id: "@_id", collectionName: collectionName},
            { update: { method: 'PUT' } });
    }
})();