var randomValues = require('../lib/randomvalues'),
assert = require('assert');


describe("Test For Random Values",function(){
	it("Test For Random Integers",function(){
		var rand = new randomValues();

		var randomInt = rand.randomInt();

		console.log("Random Int = ",randomInt);

		assert.ok(randomInt,"Umm OK");

		assert.notEqual(randomInt,0);
	});


	it("Test For Random Strings",function(){
		var rand = new randomValues();

		var randomString = rand.randomString(15);

		console.log("Random String = ",randomString);
		console.log("Random String Length = ",randomString.length);

		assert.ok(randomString,"Umm OK");

		assert.notEqual(randomString,null);
	});


	it("Test For Random Dates",function(){
		var rand = new randomValues();

		var randomDate = rand.randomDate();

		console.log("Random Date = ",randomDate);

		assert.ok(randomDate);

		assert.notEqual(randomDate,null);
		assert.notEqual(randomDate,undefined);
	});

});