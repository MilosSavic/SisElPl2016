"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.list = list;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;

function list(req, res, next){

  User.find()
    .exec(function(err, users){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      var jsObject = {users};
      res.json(jsObject);
    }    
  });
}

function createUser(req, res, next){
    var user = new User(req.body);


user.save(function (err, user) {
  if (err) return console.error(err);
  console.log("Save successful");
});

    res.json(user); 
}


function getUserById(req, res, next,id){
  User.findById(id).exec(function(err,user){
    if(err)
    {
      return res.status(400).send({
        message: "Error"
      });
    }else {
      res.json(user);
    }

  });
}
