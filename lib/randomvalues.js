
module.exports = function()
{

	this.minInt = -32000;
	this.maxInt = 32000;
	this.minYear = 1901;
	this.maxYear = 2099;
	this.minDay = 0;
	this.maxDay = 31;
	this.minMonth = 0;
	this.maxMonth = 12;

	this.minHour = 0;
	this.maxHour = 24;
	this.minMinute = 0;
	this.maxMinute = 60;
	this.minSecond = 0;
	this.maxSecond = 60;

	this.characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];

	this.randomInt = function(){

		var value = Math.floor(Math.random() * (this.maxInt - this.minInt)) + this.minInt;	

		return value;
	};

	
	this.randomDate = function(){

		var day = Math.floor(Math.random() * (this.maxDay - this.minDay)) + this.minDay;	
		var month = Math.floor(Math.random() * (this.maxMonth - this.minMonth)) + this.minMonth;	
		var year = Math.floor(Math.random() * (this.maxYear - this.minYear)) + this.minYear;	

		var hour = Math.floor(Math.random() * (this.maxHour - this.minHour)) + this.minHour;
		var minute = Math.floor(Math.random() * (this.maxMinute - this.minMinute)) + this.minMinute;
		var second = Math.floor(Math.random() * (this.maxSecond - this.minSecond)) + this.minSecond;

		var value = new Date(year,month,day,hour,minute,second);

		return value;
	};


	this.randomString = function(maxLength){

		var randomStringLength = Math.floor(Math.random() * maxLength);

		if(maxLength){
			var firstLetter = this.capitalizeLetter(this.characters[Math.floor(Math.random() * (this.characters.length))]);
			var value = firstLetter;

			for (var i = 1; i < randomStringLength; i++) {
				
				value += this.characters[Math.floor(Math.random() * (this.characters.length))];
			};



				return value;
		}

		return null;

		
	};

	this.capitalizeLetter = function(letter){
		return letter.toUpperCase();
	}

}