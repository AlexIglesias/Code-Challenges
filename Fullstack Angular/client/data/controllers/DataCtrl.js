(function() {
    var DataCtrl = function (geoblinkFactory, $location) {
        var vm = this;
        vm.titulo = "GeoBlinkApp";
        vm.newData = {};
        vm.newData.address = "";
        vm.newData.variables = {};
        vm.newData.variables.population = 0;
        vm.newData.variables.is_reference = false;
        vm.newData.variables.indexes = {};
        vm.newData.variables.indexes.population = 5;
        vm.newData.variables.indexes.unemployment = 5;
        vm.newData.variables.indexes.commercial_activity = 5;
        vm.newData.variables.indexes.wealth = 5;
        vm.newData.variables.indexes.traffic = 5;
        vm.newData.variables.indexes.foreigners = 5;
        vm.newData.variables.indexes.dependency_rate = 5;
        vm.data = geoblinkFactory.query();
        vm.saveData = saveData;
        vm.removeData = removeData;

        function saveData() {
            var newData = new geoblinkFactory(vm.newData);
            newData.$save();
            $location.path('/data/listData');
        }

        function removeData(_id) {
            geoblinkFactory.remove({ _id: _id }, function(){
                $location.path('/');
            });
        }
    }
    angular.module("geoBlinkApp").controller("DataCtrl", DataCtrl)
}());

