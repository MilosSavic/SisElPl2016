"use strict";

var mongoose = require('mongoose'),
    Amount = mongoose.model('Amount');

module.exports.list = list;
module.exports.createAmount = createAmount;
module.exports.getAmountById = getAmountById;

var crypto = require("./encrypt-decrypt");

function list(req, res, next){

  Amount.find()
    .exec(function(err, amounts){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      for(var i=0; i<amounts.length; i++)
      { 
        var decrypted = crypto.decryptData(amounts[i]);
        amounts[i] = decrypted;
      }
      var jsObject = {amounts};
      res.json(jsObject);
    }    
  });
}

function createAmount(req, res, next){
    var amount = new Amount(req.body);
    crypto.encryptData(amount);

amount.save(function (err, amount) {
  if (err) return console.error(err);  
  console.log("Save successful");
});
    
    res.json(amount); 
}


function getAmountById(req, res, next,id){
  Amount.findById(id).exec(function(err,amount){
    if(err)
    {
      return res.status(400).send({
        message: "Error"
      });
    }else {
      res.json(amount);
    }

  });
}