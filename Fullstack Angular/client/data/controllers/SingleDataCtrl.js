(function () {
    var SingleDataCtrl = function ($routeParams, geoblinkFactory, $location) {
        var vm = this;
        vm.titulo = "Modify Data";
        var idData = $routeParams.idData;

        geoblinkFactory.get({ _id: idData }, function (res) {
            vm.data = res;
        });
        vm.updateData = function () {
            geoblinkFactory.update(vm.data);
            $location.path('/data/listData');
        }
    }
    angular.module("geoBlinkApp").controller("SingleDataCtrl", SingleDataCtrl);
}());