"use strict"

var mongoose = require('mongoose'),
    Insurance = mongoose.model('Insurance'),
    User = mongoose.model('User'),
    HouseInsurance = mongoose.model('HouseInsurance'),
    CarInsurance = mongoose.model('CarInsurance'),
    Region = mongoose.model('Region');

module.exports.list = list;
module.exports.createInsurance = createInsurance;
module.exports.getInsuranceById = getInsuranceById;

var usersFunctions = require('./user.server.controller.js');


function list(req, res, next){

  Insurance.find()
    .exec(function(err, insurances){
    if(err){
         return res.status(400).send({
           message: "Something happened :D"
         }); 
    }else {
      res.json(insurances);
    }    
  });
}

function createInsurance(req, res, next){
  var user = {};
  var users = [];
  for(var i=0;i<req.body.users.length;i++)
  {
    console.log(JSON.stringify(req.body.users[i]));
    user = new User(req.body.users[i]);

    //ovo ne bi trebalo da bude ovde, vec verovatno u users.server.controller
    user.save(function(err,user){
      if(err) return console.error(err);
      console.log('User saved');
    })
    users.push(user);
  }

  req.body.users = users;

  var houseInsurance;
  if(req.body.houseInsurance)
  {
    houseInsurance = new HouseInsurance(req.body.houseInsurance);
    houseInsurance.save(function(err,houseInsurance){
      if(err) return console.error(err);
      console.log('House insurance saved');
    })
    req.body.houseInsurance = houseInsurance;
  }
  

  var carInsurance;
  if(req.body.carInsurance)
  {
    carInsurance = new CarInsurance(req.body.carInsurance);
    carInsurance.save(function(err,carInsurance){
      if(err) return console.error(err);
      console.log('Car insurance saved');
    })

     req.body.carInsurance = carInsurance;
  }

	var insurance = new Insurance(req.body);


	insurance.save(function (err, insurance) {
	  if (err) return console.error(err);
	  console.log("Save successful");
	});
  
	res.json(insurance); 

}

function getInsuranceById(req, res, next,id){
  Insurance.findById(id).exec(function(err,insurance){
    if(err)
    {
      return res.status(400).send({
        message: "Error"
      });
    }else {
      res.json(insurance);
    }

  });
}