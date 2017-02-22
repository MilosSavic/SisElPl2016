"use strict";

var mongoose = require('mongoose'),
    Sport = mongoose.model('Sport'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createSport = createSport;
module.exports.getSportById = getSportById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  Sport.find()
    .exec(function(err, sports){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<sports.length; i++)
      { 
        var decrypted = crypto.decryptData(sports[i]);
        sports[i] = decrypted;
      }
      var jsObject = {sports};
      res.json(jsObject);
    }    
  });
}

function createSport(req, res, next){
     req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var sport = new Sport(req.body);

crypto.encryptData(sport);
sport.save(function (err, sport) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
  else{
  res.json(sport);
  console.log("Save successful");
}
});

     
}


function getSportById(req, res, next,id){
  Sport.findById(id).exec(function(err,sport){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(sport);
    }

  });
}