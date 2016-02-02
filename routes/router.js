var express = require('express');
var router = express.Router();
var dataServer = require('../lib/dataserver');
var config = require('../config');
var mssql = require('mssql');


var ds = new dataServer();


function renderJson(queryString,res)
{

	mssql.connect(ds.db_config,function(err){
		if(!err){
			var request = new mssql.Request();

			request.query(queryString,function(err,recordset){
				res.json(recordset);
			});

		}else{
			throw err;
		}
	});
}


router.get('/',function(req,res){
	res.render('index');
});


router.get('/tables',function(req,res){

	var ds = new dataServer();

	var queryString = ds.getTables();

	renderJson(queryString,res);



});



router.get('/types',function(req,res){

	var queryString = ds.getTypes();
	renderJson(queryString,res);

	
	
});


router.get('/columns/:tablename',function(req,res){


		var tablename = req.params.tablename;
		
		var queryString = ds.getColumns(tablename);


	renderJson(queryString,res);


});


router.get('/data/:tablename',function(req,res){

	var tablename = req.params.tablename;
	var queryString = ds.getTableData(tablename);

	renderJson(queryString,res);


});



router.post('/seedrows',function(req,res){
	// var data = req.body;
	var ds = new dataServer();
	ds.seedRows('tblExitCodes');
});


router.get('/app',function(req,res){
	var db = {db_server: config.db_server,database: config.database};
	res.json(db);

});

module.exports = router;