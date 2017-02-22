"use strict";

//var mongoose = require('./config/mongoose');
//NOOLS
var nools = require('nools');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require("fs");
var helmet = require('helmet');
var log4js = require('log4js');



var path = require('path');
global.appRoot = path.resolve(__dirname);

log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console()); 
log4js.addAppender(log4js.appenders.file('logs/merchant-server.log'), 'merchant');
 
global.logger = log4js.getLogger('merchant');
logger.setLevel('INFO');

require('./models/region.model');
require('./models/insurance.model');
require('./models/house-insurance.model');
require('./models/car-insurance.model');
require('./models/sport.model');
require('./models/user.model');
require('./models/amount.model');
require('./models/house-insurance-category.model');
require('./models/car-insurance-service.model');
require('./models/transaction.model');
require('./models/merchant.model');




//csrf zastita testiranje
var express = require("express");
var	app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var csrf = require('csurf');


// Load keys for establishing secure HTTPS connection

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


// Start secure HTTPS server

//var db = mongoose(); da li je ovo neophodno?

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/merchant-server-reqres.log'), {flags: 'a'})
//HOW TO USE CSURF?
//app.use(function(req, res, next) {
 // res.locals._csrf = req.csrfToken();
 // next();
//});
app.use(morgan("dev"));
app.use(morgan(":date :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",{stream: accessLogStream}));



require('./controllers/encrypt-decrypt');


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
require('./routes/transaction.server.routes')(app);
require('./routes/merchant.server.routes')(app);
require('./routes/communication.server.routes')(app);
require('./routes/email.server.routes')(app);





//console log is loaded by default, so you won't normally need to do this 
//log4js.loadAppender('console'); 

 
//logger.trace('Entering cheese testing');
//logger.debug('Got cheese.');
//logger.info('Cheese is Gouda.');
//logger.warn('Cheese is quite smelly.');
//logger.error('Cheese is too ripe!');
//logger.fatal('Cheese was breeding ground for listeria.');


https.createServer(httpsOptions, app).listen(3000, function() {
   logger.info("Express https server listening on port " + "3000");
});


//is this necessary?
var mongoOpt = {
          "server": { 
            "sslValidate": false,
            "sslKey": fs.readFileSync('./cert/key.pem'),
            "sslCert": fs.readFileSync('./cert/cert.pem')
          }
        }
mongoose.connect('mongodb://localhost/insurance',mongoOpt);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  logger.info("Connected to MongoDB")
});

