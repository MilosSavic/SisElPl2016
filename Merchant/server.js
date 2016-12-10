"use strict";

//var mongoose = require('./config/mongoose');
//NOOLS
var nools = require('nools');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/insurance2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo database");
});

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



var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors")

//var db = mongoose(); da li je ovo neophodno?

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));


var regions = require('./controllers/region.server.controller.js');
var insurances = require('./controllers/insurance.server.controller.js');
var houseInsurances = require('./controllers/house-insurance.server.controller.js');
var carInsurances = require('./controllers/car-insurance.server.controller.js');
var sports = require('./controllers/sport.server.controller.js');
var users = require('./controllers/user.server.controller.js');
var amounts = require('./controllers/amount.server.controller.js');
var houseInsuranceCategories = require('./controllers/house-insurance-category.server.controller.js');
//da li je ovo dobro?
var userRules = require('./rules/rules.user.js');
var houseInsuranceRules = require('./rules/rules.house-insurance.js');
var totalRules = require('./rules/rules.total.js');



 app.route('/api/regions')
    .get(regions.list)
    .post(regions.createRegion);

app.route('/api/regions/:regionId')
    .get(regions.getRegionById);
app.param('regionId', regions.getRegionById);

 app.route('/api/sports')
    .get(sports.list)
    .post(sports.createSport);

app.route('/api/sports/:sportId')
    .get(sports.getSportById);
app.param('sportsId', sports.getSportById);

app.route('/api/users')
    .get(users.list)
    .post(users.createUser);

app.route('/api/users/:userId')
    .get(users.getUserById);
app.param('userId', users.getUserById);

app.route('/api/insurances')
    .get(insurances.list)
    .post(insurances.createInsurance);

app.route('/api/insurances/:id')
    .get(insurances.getInsuranceById);
app.param('id', insurances.getInsuranceById);

app.route('/api/houseInsurances')
    .get(houseInsurances.list)
    .post(houseInsurances.createHouseInsurance);

app.route('/api/amounts')
    .get(amounts.list)
    .post(amounts.createAmount);

app.route('/api/amounts/:amountId')
    .get(amounts.getAmountById);
app.param('amountId', amounts.getAmountById);

app.route('/api/houseInsuranceCategories')
    .get(houseInsuranceCategories.list)
    .post(houseInsuranceCategories.createHouseInsuranceCategory);

app.route('/api/amounts/:amountId')
    .get(amounts.getAmountById);
app.param('amountId', amounts.getAmountById);


app.route('/api/carInsurances')
    .get(carInsurances.list)
    .post(carInsurances.createCarInsurance);

    

app.route('/api/userRules')
    .post(userRules.execute);
    
app.route('/api/houseInsuranceRules')
    .post(houseInsuranceRules.execute);

app.route('/api/totalRules')
    .post(totalRules.execute);






app.listen(3000, function() {
    console.log("Server started");
});

