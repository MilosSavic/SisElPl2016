"use strict";

//var mongoose = require('./config/mongoose');
var mongoose = require('mongoose');
var helmet = require('helmet');
var fs = require("fs");
mongoose.connect('mongodb://localhost/payment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo database");
});


var path = require('path');
global.appRoot = path.resolve(__dirname);

require('./models/buyer.model');
require('./models/seller.model');
require('./models/payment.model');


var express = require("express");
//var nodemailer = require("nodemailer");
var	app = express();
//var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser = require("body-parser");
var cors = require("cors");

//var db = mongoose();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/payment-server-reqres.log'), {flags: 'a'})
//HOW TO USE CSURF?
//app.use(function(req, res, next) {
 // res.locals._csrf = req.csrfToken();
 // next();
//});
app.use(morgan("dev"));
app.use(morgan(":date :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",{stream: accessLogStream}));


var buyers = require('./controllers/buyer.server.controller.js');
var sellers = require('./controllers/seller.server.controller.js');
var payments = require('./controllers/payment.server.controller.js');
var mainServices = require('./controllers/communication.server.controller.js');



app.route('/api/payments')
    .get(payments.list)
    .post(payments.createPayment);

app.route('/api/buyers')
    .get(buyers.list)
    .post(buyers.createBuyer);

app.route('/api/sellers')
    .get(sellers.list)
    .post(sellers.createSeller);



app.route('/api/payments/:paymentId')
    .put(payments.updatePayment);
app.param('paymentId', payments.updatePayment);
	
app.route('/api/getURLandID')
	.get(mainServices.getURLandID)
    .post(mainServices.getURLandID);
	
app.route('/api/checkCodeValidity')
	.get(mainServices.checkCodeValidity)
	.post(mainServices.checkCodeValidity);



var fs = require("fs");

var https = require("https");
var path = require("path");
var httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, "./cert/key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./cert/cert.pem")),
    passphrase: "insuranceapp"
};


//A5 misconfig
    app.use(helmet());
        // Prevent opening page in frame or iframe to protect from clickjacking
        app.disable("x-powered-by");

        // Prevent opening page in frame or iframe to protect from clickjacking
        app.use(helmet.frameguard());

        // Prevents browser from caching and storing page
        app.use(helmet.noCache());

        // Allow loading resources only from white-listed domains
        //app.use(helmet.csp());

        // Allow communication only on HTTPS
        app.use(helmet.hsts());

        // Forces browser to only use the Content-Type set in the response header instead of sniffing or guessing it
        app.use(helmet.noSniff());


https.createServer(httpsOptions, app).listen(8000, function() {
    console.log("Express https server listening on port " + "8000");
});