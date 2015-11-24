var assert = require('assert');
var request = require('request');
var http = require('http');
var fs = require('fs');
var url = require('url');


//if using mocha
// describe("Manone",function(){
// 	it("Is Well With My Soul",function(){
// 		assert.equal(1,1);
// 	});
// });


// var options = {
// 	host: 'localhost',
// 	path: '/tables',
// 	port: 3000,
// 	method :'GET'
// };

// var options = url.parse("http://localhost:3000/tables");
var options = url.parse("http://localhost:3000/columns/tblEmployer");

writeLine();

p("Starting Test");
p("Test For : " + url.format(options));

var foo = {};

http.get(options,function(res){
	

	p("Status : " + res.statusCode);

	res.on("data",function(chunk){
		foo += chunk;
		// foo += JSON.stringify(chunk);
		// foo += "Fooing";
		p('' + chunk + '\n');
	});


	res.on("end",function(){
		// writeLine();
		p("Typeof Foo = " + typeof(foo));
		p("Count = " + foo.length);
		p("THE END !!!");

		
	});

});


function writeLine(){
	p("=====================================================================================");
}

function p(msg){
	//printing function
	console.log(msg);
}