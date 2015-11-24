var mssql = require('mssql');
var config = require('../config');

module.exports = function(){

	this.db_config = {
		user: config.db_user,
		password:config.db_password,
		server:config.db_server,
		database:config.database
	};
	this.getTables = function(response){
		var query = "SELECT name,object_id FROM sys.objects Where type_desc = 'USER_TABLE' ORDER BY name";
		this.runSql(query,response);
	
	};

	this.getTableData = function(tablename, response){
		var query = "SELECT TOP 1000 * FROM " + tablename ;
		this.runSql(query,response);
	
	};

	this.getTypes = function(response){
		var query = "SELECT t.name, t.user_type_id,t.max_length FROM sys.types t";
		this.runSql(query,response);
	
	};


	this.getColumns = function(tablename,response){
		var query = "SELECT c.object_id, c.name, c.column_id, c.user_type_id,c.max_length , t.name As type_name FROM sys.columns c INNER JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE object_id IN (SELECT object_id FROM sys.objects Where name = '" + tablename + "') ORDER BY c.column_id";

		this.runSql(query,response);
	
	};

	this.runSql = function(query_string,response){

		mssql.connect(this.db_config,function(err){

			var request = new mssql.Request();

			request.query(query_string,function(err,recordset){
				if(!err){
					console.log("Succes Query");
					response.json(recordset);					
				
				}
				else{
					// console.log("Error Query");

					throw err;
				}
			});

			mssql.on("error",function(err){
				console.log("Database error \n " + err);
			});
		});

	};


}