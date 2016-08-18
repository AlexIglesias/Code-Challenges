(function () {
    var MenuCtrl = function ($location) {
        var vm = this;
        vm.titulo = "geoBlinkApp - Ironhack";
        vm.isActive = function (route) {
            return route === $location.path();
        }
    }
    angular.module('geoBlinkApp').controller('MenuCtrl', ['$location', MenuCtrl]);
}());