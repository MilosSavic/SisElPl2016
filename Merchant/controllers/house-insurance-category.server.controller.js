"use strict";

var mongoose = require('mongoose'),
    HouseInsuranceCategory = mongoose.model('HouseInsuranceCategory');

module.exports.list = list;
module.exports.createHouseInsuranceCategory = createHouseInsuranceCategory;
module.exports.getHouseInsuranceCategoryById = getHouseInsuranceCategoryById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  HouseInsuranceCategory.find()
    .exec(function(err, houseInsuranceCategories){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
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
  if (err) return console.error(err);
  console.log("Save successful");
});

    res.json(houseInsuranceCategory); 
}


function getHouseInsuranceCategoryById(req, res, next,id){
  HouseInsuranceCategory.findById(id).exec(function(err,result){
    if(err)
    {
      return res.status(400).send({
        message: "Error"
      });
    }else {
      res.json(result);
    }

  });
}