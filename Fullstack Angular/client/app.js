angular.module("geoBlinkApp",['ngResource','ngRoute']);

angular.module('geoBlinkApp').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'DataCtrl',
            controllerAs: 'vm',
            templateUrl: 'data/templates/index.html'
        })
        .when('/data/newData', {
            controller: 'DataCtrl',
            controllerAs: 'vm',
            templateUrl: 'data/templates/new.html'
        })
        .when('/data/listData', {
            controller: 'DataCtrl',
            controllerAs: 'vm',
            templateUrl: 'data/templates/list.html'
        })
        .when('/data/:idData', {
            controller: 'SingleDataCtrl',
            controllerAs: 'vm',
            templateUrl: 'data/templates/update.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
