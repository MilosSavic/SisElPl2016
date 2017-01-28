"use strict"

var mongoose = require('mongoose'),
    Seller = mongoose.model('Seller'),
    xss = require('xss'),
    crypto = require("./encrypt-decrypt");

module.exports.list = list;
module.exports.createSeller = createSeller;

function list(req, res, next){

  Seller.find()
    .exec(function(err, sellers){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      for(var i=0; i<sellers.length; i++)
      { 
        var decrypted = crypto.decryptData(sellers[i]);
        sellers[i] = decrypted;
      }
      res.json(sellers);
    }
  });
}

function createSeller(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var seller = new Seller(req.body);
    console.log(req.body);
    console.log(seller);
    crypto.encryptData(seller);
    seller.save(function (err, seller) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(seller);
}