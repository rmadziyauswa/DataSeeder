var config = require('../config');
var mssql = require('mssql');

module.exports = function(){

	this.db_config = {
		user: config.db_user,
		password:config.db_password,
		server:config.db_server,
		database:config.database
	};
	this.getTables = function(){
		var query = "SELECT name,object_id FROM sys.objects Where type_desc = 'USER_TABLE' ORDER BY name";
		return query;
	
	};

	this.getTableData = function(tablename){
		var query = "SELECT * FROM " + tablename ;
		return query;
	
	};

	this.getTypes = function(){
		var query = "SELECT t.name, t.user_type_id,t.max_length FROM sys.types t";
		return query;
	
	};


	this.getColumns = function(tablename){
		var query = "SELECT c.object_id, c.name, c.column_id, c.user_type_id,c.max_length , t.name As type_name FROM sys.columns c INNER JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE object_id IN (SELECT object_id FROM sys.objects Where name = '" + tablename + "') ORDER BY c.column_id";

		return query;
	
	};

	this.seedRows = function(tablename){

		var query = this.getColumns(tablename);

		mssql.connect(this.db_config,function(err){
			if(!err)
			{
				var request = new mssql.Request();

				request.query(query,function(err,recordset){
					if(!err)
					{
						console.dir(recordset);
					}else{
						console.log(err);
					}
				});
			}else{
				console.log("database error");
			}

		});


	};

	this.getColumnsArray = function(tablename){
	};

}