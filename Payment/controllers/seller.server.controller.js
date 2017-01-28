"use strict"

var mongoose = require('mongoose'),
    Seller = mongoose.model('Seller'),
    xss = require('xss');

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
      res.json(sellers);
    }
  });
}

function createSeller(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var seller = new Seller(req.body);
    console.log(req.body);
    console.log(seller);
    seller.save(function (err, seller) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(seller);
}