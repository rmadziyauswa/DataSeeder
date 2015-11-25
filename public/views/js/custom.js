(function(){
	'use strict';

	var app = angular.module("DataSeeder",["ngRoute"]);

	app.config(["$routeProvider",function($routeProvider){

		$routeProvider
		.when("/",{
			templateUrl : "/templates/home.html",
			controller : "AppCtrl"
		})
		.when('/tables',{
			templateUrl : "/templates/tables.html",
			controller : "TablesCtrl"
		})
		.when("/data/:tablename",{
			templateUrl : "/templates/preview.html",
			controller : "DataCtrl"
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
			},

			getAppInfo : function(){
				return $http.get(baseUrl + "/api/app/");
			}
		};

	}]);

	app.controller("AppCtrl",["$scope","Base",function($scope,Base){

		Base.getAppInfo().then(function(response){
			$scope.app = response.data;
		});

	}]);

	app.controller("TablesCtrl",["$scope","$http","Base",function($scope,$http,Base){
			
		$scope.tables = [];

		Base.getTables().then(function(response){
			$scope.tables = response.data;
		});


		$scope.clearSearch = function(){
			$scope.search = '';
		};

		$scope.getColumns = function(tablename){	

			//set current table name
			$scope.currentTableName = tablename;	

			//get columns
			Base.getColumns(tablename).then(function(response){
				$scope.columns = response.data;	
			});
		};

	}]);


	app.controller("DataCtrl",["$scope","Base","$routeParams",function($scope,Base,$routeParams){
		
			var tablename = $routeParams.tablename;
			$scope.allData = [];
			$scope.currentTableName = tablename;	
			$scope.currentPage = 1;

			// $scope.rowsOptions = [5,10,20,50];
			$scope.rowsOptions = [2,3,5];
			$scope.currentRowsOption = $scope.rowsOptions[0];

			$scope.pageChange = function(pageNum){
				$scope.limitRows((pageNum * $scope.currentRowsOption), $scope.currentRowsOption);

				$scope.currentPage = pageNum;

			}

			$scope.limitRows = function(startPos, rowsOption){
				$scope.currentRowsOption = rowsOption;

				$scope.num_pages = Math.ceil($scope.allData.length / rowsOption);
				$scope.pages = [];

				for(var i = 1; i < $scope.num_pages; i++){
					$scope.pages.push(i);
				}


				var l_dataItems = $scope.allData.filter(function(element,index){			

					return ( index >= startPos && index < (startPos + rowsOption) ) ? true : false; 
				});

				$scope.dataItems = l_dataItems;

			}

			Base.getTableData(tablename).then(function(response){
				$scope.allData = response.data;
				$scope.limitRows(0,$scope.rowsOptions[0]);

				if($scope.dataItems[0]){
					$scope.headerObject = $scope.dataItems[0];
				}

			});

	}]);




	app.controller("TypesCtrl",["$scope","$http","Base",function($scope,$http,Base){
	
		
		Base.getTypes().then(function(response){
			$scope.types = response.data;

		});


	}]);

})();