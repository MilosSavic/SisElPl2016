"use strict"

var mongoose = require('mongoose'),
    Insurance = mongoose.model('Insurance'),
    User = mongoose.model('User'),
    HouseInsurance = mongoose.model('HouseInsurance'),
    CarInsurance = mongoose.model('CarInsurance'),
    Region = mongoose.model('Region'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller');

module.exports.list = list;
module.exports.createInsurance = createInsurance;
module.exports.getInsuranceById = getInsuranceById;

var usersFunctions = require('./user.server.controller.js');
var transactionFunctions = require('./transaction.server.controller.js')
var crypto = require("./encrypt-decrypt");


function list(req, res, next){

  Insurance.find()
    .exec(function(err, insurances){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(insurances);
    }    
  });
}

function createInsurance(req, res, next){
  function addUsers(){
    var user = {};
    var users = [];
    for(var i=0;i<req.body.users.length;i++)
    {
      console.log(JSON.stringify(req.body.users[i]));
      user = new User(req.body.users[i]);
      crypto.encryptData(user);
      //ovo ne bi trebalo da bude ovde, vec verovatno u users.server.controller
      user.save(function(err,user){
        if(err){
        var errMessage = errorHandler.getErrorMessage(err);
        errorHandler.logErrorMessage(errMessage);
        return res.status(400).send({
          message: errMessage
        });
      }
      else{
        console.log('User saved');
        users.push(user);
        if(users.length == req.body.users.length){
          req.body.users = users;
          addHouseInsurance();
        }
      }
      })   
    }
    
    
  }

  function addHouseInsurance(){
  var houseInsurance;
  if(req.body.houseInsurance)
  {
    houseInsurance = new HouseInsurance(req.body.houseInsurance);
    crypto.encryptData(houseInsurance);
    houseInsurance.save(function(err,houseInsurance){
      if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
      console.log('House insurance saved');
      req.body.houseInsurance = houseInsurance._id;
      addCarInsurance();

    }
    })   
    }
    else {
      addCarInsurance();
    }
  }
  
  function addCarInsurance(){
  var carInsurance;
  if(req.body.carInsurance)
  {
    carInsurance = new CarInsurance(req.body.carInsurance);
    crypto.encryptData(carInsurance);
    carInsurance.save(function(err,carInsurance){
      if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
      req.body.carInsurance = carInsurance._id;
      console.log('Car insurance saved');
      addTransaction();
 
    }
    })
  }
  else{
    addTransaction();
  }
}
  //WE ALSO NEED TO ROLLBACK CHANGES IN CASE THERE'S AN ERROR!!!
  function addTransaction(){
	  var reqForTrans = {
		  body: {
			  amount: req.body.price
		  } 
	  }
	  var transaction = transactionFunctions.createTransactionServer(reqForTrans,function(transaction){
		req.body.transaction = transaction._id; 
		addInsurance();
	  });
	 
	  
  }
  function addInsurance(){
    //console.log(JSON.stringify(req.body));
    var insurance = new Insurance(req.body);
    crypto.encryptData(insurance);
  	insurance.save(function (err, insurance) {
  	  if (err){
        var errMessage = errorHandler.getErrorMessage(err);
        errorHandler.logErrorMessage(errMessage);
        return res.status(400).send({
          message: errMessage
        });
      }
      else{
  	  console.log("Save successful");
      res.json(insurance); 
    }
  	});
	}

  addUsers();
  

}

function getInsuranceById(req, res, next,id){
  Insurance.findById(id).exec(function(err,insurance){
    if(err)
    {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(insurance);
    }

  });
}