(function () {
    var geoblinkFactory = function ($resource)  {
        return $resource("/api/data/:_id", {}, {
        	'update': {
                method: 'PUT'
            }
        });
    };
    angular.module("geoBlinkApp").factory('geoblinkFactory', geoblinkFactory);
}());