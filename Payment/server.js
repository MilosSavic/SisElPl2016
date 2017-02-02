"use strict";

//var mongoose = require('./config/mongoose');
var mongoose = require('mongoose');
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
var nodemailer = require("nodemailer");
var	app = express();
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser = require("body-parser");
var cors = require("cors");

//var db = mongoose();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));


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





var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'siselup2017@gmail.com',
        pass: 'sep_2017'
    },
    tls: {rejectUnauthorized: false},
    debug:true
}));


app.get('/successURL',function(req,res){
    var mailOptions={
        from : 'siselup2017@gmail.com',
        to : 'siselup2017@gmail.com',
        subject : 'Success',
        text : 'Successfully completed payments'
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
       // res.end("error");
     }else{
            console.log("Message sent: " + response.message);
      //  res.end("sent");
         }
    });
});

app.get('/errorURL',function(req,res){
    var mailOptions={
        from : 'siselup2017@gmail.com',
        to : 'siselup2017@gmail.com',
        subject : 'Error',
        text : 'There was an error'
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
       // res.end("error");
     }else{
            console.log("Message sent: " + response.message);
      //  res.end("sent");
         }
    });
});

app.get('/failedURL',function(req,res){
    var mailOptions={
        from : 'siselup2017@gmail.com',
        to : 'siselup2017@gmail.com',
        subject : 'Failed',
        text : 'Transaction failed'
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
       // res.end("error");
     }else{
            console.log("Message sent: " + response.message);
      //  res.end("sent");
         }
    });
});



https.createServer(httpsOptions, app).listen(8000, function() {
    console.log("Express https server listening on port " + "8000");
});