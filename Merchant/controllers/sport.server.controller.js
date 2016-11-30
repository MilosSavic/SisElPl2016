"use strict";

var mongoose = require('mongoose'),
    Sport = mongoose.model('Sport');

module.exports.list = list;
module.exports.createSport = createSport;
module.exports.getSportById = getSportById;

function list(req, res, next){

  Sport.find()
    .exec(function(err, sports){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      var jsObject = {sports};
      res.json(jsObject);
    }    
  });
}

function createSport(req, res, next){
    var sport = new Sport(req.body);


sport.save(function (err, sport) {
  if (err) return console.error(err);
  console.log("Save successful");
});

    res.json(sport); 
}


function getSportById(req, res, next,id){
  Sport.findById(id).exec(function(err,sport){
    if(err)
    {
      return res.status(400).send({
        message: "Error"
      });
    }else {
      res.json(sport);
    }

  });
}