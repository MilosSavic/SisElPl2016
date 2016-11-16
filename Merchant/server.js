"use strict";

//var mongoose = require('./config/mongoose');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/insurance2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo database");
});


require('./models/region.model');
require('./models/insurance.model');


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

 app.route('/api/regions')
    .get(regions.list)
    .post(regions.createRegion);

app.route('/api/insurances')
    .get(insurances.list)
    .post(insurances.createInsurance);



app.listen(3000, function() {
    console.log("Server started");
});