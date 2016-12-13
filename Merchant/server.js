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
require('./models/car-insurance-service.model');

var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors")

//var db = mongoose(); da li je ovo neophodno?

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

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
require('./routes/user-rules.server.routes')(app);
require('./routes/house-insurance-rules.server.routes')(app);
require('./routes/car-insurance-rules.server.routes')(app);
require('./routes/total-rules.server.routes')(app);


app.listen(3000, function() {
    console.log("Server started");
});

