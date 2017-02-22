"use strict";

var mongoose = require('mongoose'),
    Region = mongoose.model('Region'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createRegion = createRegion;
module.exports.getRegionById = getRegionById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  Region.find()
    .exec(function(err, regions){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<regions.length; i++)
      { 
        var decrypted = crypto.decryptData(regions[i]);
        regions[i] = decrypted;
      }
      var jsObject = {regions};
      res.json(jsObject);
    }    
  });
}

function createRegion(req, res, next){
   req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var region = new Region(req.body);

crypto.encryptData(region);
region.save(function (err, region) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
  console.log("Save successful");
  res.json(region); 
}
});

    
}


function getRegionById(req, res, next,id){
  Region.findById(id).exec(function(err,region){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(region);
    }

  });
}