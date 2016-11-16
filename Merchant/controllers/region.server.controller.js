"use strict";

var mongoose = require('mongoose'),
    Region = mongoose.model('Region');

module.exports.list = list;
module.exports.createRegion = createRegion;

function list(req, res, next){

  Region.find()
    .exec(function(err, regions){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      res.json(regions);
    }    
  });
}

function createRegion(req, res, next){
    var region = new Region(req.body);


region.save(function (err, region) {
  if (err) return console.error(err);
  console.log("Save successful");
});

    res.json(region); 
}