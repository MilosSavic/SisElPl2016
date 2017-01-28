"use strict"

var mongoose = require('mongoose'),
    Buyer = mongoose.model('Buyer'),
    xss = require('xss');

module.exports.list = list;
module.exports.createBuyer = createBuyer;

function list(req, res, next){

  Buyer.find()
    .exec(function(err, buyers){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         });
    }else {
      res.json(buyers);
    }
  });
}

function createBuyer(req, res, next){
    req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var buyer = new Buyer(req.body);
    buyer.save(function (err, buyer) {
      if (err) return console.error(err);
      console.log("Save successful");
    });

    res.json(buyer);
}