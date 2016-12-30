"use strict";

var mongoose = require('mongoose'),
    CarInsuranceService = mongoose.model('CarInsuranceService');

module.exports.list = list;
module.exports.createCarInsuranceService = createCarInsuranceService;
module.exports.getCarInsuranceServiceById = getCarInsuranceServiceById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  CarInsuranceService.find()
    .exec(function(err, carInsuranceServices){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      for(var i=0; i<carInsuranceServices.length; i++)
      { 
        var decrypted = crypto.decryptData(carInsuranceServices[i]);
        carInsuranceServices[i] = decrypted;
      }
      var jsObject = {carInsuranceServices};
      res.json(jsObject);
    }    
  });
}

function createCarInsuranceService(req, res, next){
    var carInsuranceService = new CarInsuranceService(req.body);
    crypto.encryptData(carInsuranceService);
    console.log(carInsuranceService);
  carInsuranceService.save(function (err, result) {
  if (err) return console.error(err);
  console.log("Save successful");
});

    res.json(carInsuranceService); 
}


function getCarInsuranceServiceById(req, res, next,id){
  CarInsuranceService.findById(id).exec(function(err,result){
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