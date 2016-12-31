"use strict";

var mongoose = require('mongoose'),
    Sport = mongoose.model('Sport'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller');

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
      var jsObject = {sports};
      res.json(jsObject);
    }    
  });
}

function createSport(req, res, next){
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