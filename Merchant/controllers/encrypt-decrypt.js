"use strict"

var attributesToEncrypt = ["ownerJMBG","jmbg","passportNumber","address"];
var needConversionToNumber = ["amount"];

module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;

//Testing encryption and decryption
// Include crtpto module
var crypto = require("crypto");

//Set keys config object
var config = {
    cryptoKey: "a_secure_key_for_crypto_here",
    cryptoAlgo: "aes256" // or other secure encryption algo here
};

/*
var testData = {name:"Milos",lastName:"Savic",jmbg:"3443344334","passportNumber":"43434","phoneNumber":434344};
console.log(JSON.stringify(testData));
encryptData(testData);
console.log(JSON.stringify(testData));
decryptData(testData);
console.log(JSON.stringify(testData));
*/

function encryptData(data)
{
	for(var i=0; i<attributesToEncrypt.length;i++)
	{
		if(attributesToEncrypt[i] in data)
		{
			if(needConversionToNumber.indexOf(attributesToEncrypt[i]) > -1)
			{
				var convertedData = data[attributesToEncrypt[i]].toString();
				data[attributesToEncrypt[i]] = convertedData;
			}
			var encryptedAttr = encrypt(data[attributesToEncrypt[i]]);
			data[attributesToEncrypt[i]] = encryptedAttr;
		}
	}
	return data;
}

function decryptData(data)
{
	for(var i=0; i<attributesToEncrypt.length;i++)
	{
		if(attributesToEncrypt[i] in data)
		{

			var decryptedAttr = decrypt(data[attributesToEncrypt[i]]);
			data[attributesToEncrypt[i]] = decryptedAttr;
			if(needConversionToNumber.indexOf(attributesToEncrypt[i]) > -1)
			{
				var convertedData = parseInt(data[attributesToEncrypt[i]]);
				data[attributesToEncrypt[i]] = convertedData;
			}
		}
	}
	return data;
	
}
// Helper methods to encrypt / decrypt
function encrypt(toEncrypt) {
	toEncrypt = toEncrypt.toString();
    var cipher = crypto.createCipher(config.cryptoAlgo, config.cryptoKey);
    return cipher.update(toEncrypt, "utf8", "hex") + cipher.final("hex");
};

function decrypt(toDecrypt) {

	toDecrypt = toDecrypt.toString();
    var decipher = crypto.createDecipher(config.cryptoAlgo, config.cryptoKey);
    try{
  	 	var decrypted = decipher.update(toDecrypt, "hex", "utf8") + decipher.final("utf8");
    	return decrypted;
	}
	catch(ex){
		console.log("Decryption error");
		return toDecrypt;
	}

};

