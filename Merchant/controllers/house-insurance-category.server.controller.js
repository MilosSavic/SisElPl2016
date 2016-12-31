"use strict";

var mongoose = require('mongoose'),
    HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller');

module.exports.list = list;
module.exports.createHouseInsuranceCategory = createHouseInsuranceCategory;
module.exports.getHouseInsuranceCategoryById = getHouseInsuranceCategoryById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  HouseInsuranceCategory.find()
    .exec(function(err, houseInsuranceCategories){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      var jsObject = {houseInsuranceCategories};
      res.json(jsObject);
    }    
  });
}

function createHouseInsuranceCategory(req, res, next){
    var houseInsuranceCategory = new HouseInsuranceCategory(req.body);
    crypto.encryptData(houseInsuranceCategory);
houseInsuranceCategory.save(function (err, result) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
    res.json(houseInsuranceCategory); 
    console.log("Save successful");
}
});

    
}


function getHouseInsuranceCategoryById(req, res, next,id){
  HouseInsuranceCategory.findById(id).exec(function(err,result){
    if(err)
    {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(result);
    }

  });
}