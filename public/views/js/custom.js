(function(){
	'use strict';

	var app = angular.module("DataSeeder",["ngRoute"]);

	app.config(["$routeProvider",function($routeProvider){

		$routeProvider
		.when("/",{
			templateUrl : "/templates/home.html"
		})
		.when('/tables',{
			templateUrl : "/templates/tables.html",
			controller : "TablesCtrl"
		})
		.when('/types',{
			templateUrl : "/templates/types.html",
			controller : "TypesCtrl"
		})
		.otherwise({
			redirectTo : "/"
		})

	}]);

	app.factory("Base",["$location","$http",function($location,$http){

		var baseUrl = $location.protocol() + "://" + $location.host() + ":" + $location.port();

		return {
			getBaseUrl : function(){
				return baseUrl;
			},

			getTables : function(){
				return $http.get(baseUrl + "/api/tables");
			},

			getTypes : function(){
				return $http.get(baseUrl + "/api/types");
			},

			getColumns : function(tablename){
				return $http.get(baseUrl + "/api/columns/" + tablename);
			},

			getTableData : function(tablename){
				return $http.get(baseUrl + "/api/data/" + tablename);
			}
		};

	}]);

	app.controller("TablesCtrl",["$scope","$http","Base",function($scope,$http,Base){
			
		$scope.tables = [];

		$scope.currentView = "Starter";


		Base.getTables().then(function(response){

			$scope.tables = response.data;

				
		});




		$scope.clearSearch = function(){
			$scope.search = '';
		};

		$scope.previewData = function(tablename){
			$scope.currentView = "Data";
			$scope.currentTableName = tablename;

			Base.getTableData(tablename).then(function(response){
				$scope.dataItems = response.data;

				if($scope.dataItems[0]){
					$scope.headerObject = $scope.dataItems[0];
				}

			});

		}

		$scope.getColumns = function(tablename){	
		//set current table name
			$scope.currentTableName = tablename;	



				//get columns
				Base.getColumns(tablename).then(function(response){
					$scope.columns = response.data;	
				});
		};

	}]);





	app.controller("TypesCtrl",["$scope","$http","Base",function($scope,$http,Base){
	
		
		Base.getTypes().then(function(response){
			$scope.types = response.data;

		});


	}]);

})();