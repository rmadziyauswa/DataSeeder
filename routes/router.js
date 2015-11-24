var express = require('express');
var router = express.Router();
var dataServer = require('../lib/dataserver');
var config = require('../config');


router.get('/',function(req,res){
	res.render('index');
});


router.get('/tables',function(req,res){
	var ds = new dataServer();
	ds.getTables(res);
});



router.get('/types',function(req,res){
	var ds = new dataServer();
	ds.getTypes(res);
});


router.get('/columns/:tablename',function(req,res){
	var tablename = req.params.tablename;
	var ds = new dataServer();
	ds.getColumns(tablename,res);
});


router.get('/data/:tablename',function(req,res){
	var tablename = req.params.tablename;
	var ds = new dataServer();
	ds.getTableData(tablename,res);
});

router.get('/app',function(req,res){
	var db = {db_server: config.db_server,database: config.database};
	res.json(db);

});

module.exports = router;