(function(){
	angular.module('geoBlinkApp').directive('chart', function() {
	  return {
	    restrict: 'E',
	    replace: false,
	    scope: {data: '=chartRadar'},
	    link: function (scope, element) {
	    	scope.data.$promise.then(function(){
	    		var legend = {
	    			"population": "Población", 
	    			"unemployment": "Desempleo", 
	    			"commercial_activity": "Actividad Comercial", 
	    			"wealth": "Riqueza",
					"traffic": "Tráfico", 
					"foreigners": "Extranjeros", 
					"dependency_rate": "Tasa de Dependencia"
	    		};
	    		var colors = ['#FF4500', '#FFA500', '#20B2AA'];
	    		var color = d3.scale.ordinal()
	    					.range(colors);
	    		var options = {
	    			levels: 5,
	    			maxValue: 9,
	    			w: 350,
   					h: 350,
   					ExtraWidthX: 350,
   					color: color
	    		};
	    		var dataChart = [];
	    		scope.data.forEach(function(elmnt, index){
					var array = [];
					elmnt.color = colors[index];
	    			for(var key in elmnt.variables.indexes) {
	    				array.push({axis: legend[key], value: elmnt.variables.indexes[key]});
	    			}
	    			dataChart.push(array);
	    		})
	    		RadarChart.draw(element[0], dataChart, options);
	    	});
	    }
	  };
	});
})();