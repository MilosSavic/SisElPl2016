"use strict";

//var mongoose = require('./config/mongoose');
//NOOLS
var nools = require('nools');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require("fs");



var path = require('path');
global.appRoot = path.resolve(__dirname);

require('./models/region.model');
require('./models/insurance.model');
require('./models/house-insurance.model');
require('./models/car-insurance.model');
require('./models/sport.model');
require('./models/user.model');
require('./models/amount.model');
require('./models/house-insurance-category.model');
require('./models/car-insurance-service.model');




//csrf zastita testiranje
var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    csrf    = require('csurf');

// Load keys for establishing secure HTTPS connection

var https = require("https");
var path = require("path");
var httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./cert/key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./cert/cert.pem")),
    passphrase: "insuranceapp"
};
               

// Start secure HTTPS server


//Testing encryption and decryption
// Include crtpto module
var crypto = require("crypto");

//Set keys config object
var config = {
    cryptoKey: "a_secure_key_for_crypto_here",
    cryptoAlgo: "aes256" // or other secure encryption algo here
};

// Helper methods to encryt / decrypt
var encrypt = function(toEncrypt) {
    var cipher = crypto.createCipher(config.cryptoAlgo, config.cryptoKey);
    return cipher.update(toEncrypt, "utf8", "hex") + cipher.final("hex");
};

var decrypt = function(toDecrypt) {
    var decipher = crypto.createDecipher(config.cryptoAlgo, config.cryptoKey);
    return decipher.update(toDecrypt, "hex", "utf8") + decipher.final("utf8");
};

var test1 = "String za enkripciju";
// Encrypt values before saving in database
test1 = encrypt(test1);
console.log(test1);

// Decrypt values to show on view
test1 = decrypt(test1);
console.log(test1);


//var db = mongoose(); da li je ovo neophodno?

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));
//HOW TO USE CSURF?
//app.use(function(req, res, next) {
 // res.locals._csrf = req.csrfToken();
 // next();
//});


//da li je ovo dobro?

require('./routes/region.server.routes')(app);
require('./routes/sport.server.routes')(app);
require('./routes/user.server.routes')(app);
require('./routes/insurance.server.routes')(app);
require('./routes/house-insurance.server.routes')(app);
require('./routes/amount.server.routes')(app);
require('./routes/house-insurance-category.server.routes')(app);
require('./routes/car-insurance-service.server.routes')(app);
require('./routes/car-insurance.server.routes')(app);
require('./routes/all-rules.server.routes')(app);


https.createServer(httpsOptions, app).listen(3000, function() {
    console.log("Express https server listening on port " + "3000");
});


//is this necessary?
var mongoOpt = {
          "server": { 
            "sslValidate": false,
            "sslKey": fs.readFileSync('./cert/key.pem'),
            "sslCert": fs.readFileSync('./cert/cert.pem')
          }
        }
mongoose.connect('mongodb://localhost/insurance2',mongoOpt);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo database");
});

