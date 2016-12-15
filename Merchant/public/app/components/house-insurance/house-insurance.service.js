(function() {
    "use strict";

    angular
        .module('merchant-app.house-insurance')
        .factory('HouseInsurance', HouseInsurance);

    HouseInsurance.$inject = ['$resource'];
    function HouseInsurance($resource) {
        var collectionName = "houseInsurances";
        return $resource("http://localhost:3000/api/:collectionName/:id",
            {id: "@_id", collectionName: collectionName},
            { update: { method: 'PUT' } });
    }
})();