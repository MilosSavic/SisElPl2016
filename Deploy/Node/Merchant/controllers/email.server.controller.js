"use strict"

module.exports.sendEmail = sendEmail;


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Insurance = mongoose.model('Insurance'),
    Transaction = mongoose.model('Transaction'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
	crypto = require('./encrypt-decrypt');

function sendEmail(req,res,next){

var transactionId = req.body.transactionId;
var emails = [];
Transaction.findOne({idNumber: transactionId}).exec(function(err,response){
  if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else {
      if(response){
        if(response._id){
           if(response.emailsSent){
              return res.status(400).send({
                message: "Emails already sent"
              })
            }
            else updateTransaction(response);

          Insurance.findOne({transaction:response._id}).exec(function(err,response){
            if(err){
              var errMessage = errorHandler.getErrorMessage(err);
              errorHandler.logErrorMessage(errMessage);
              return res.status(400).send({
              message: errMessage
            });
            }
            else{
              if(response){
                if(response.users){
                    var users = response.users;
                   

                    for(var i=0; i<users.length; i++){
                      User.findOne({_id: users[i]}).exec(function(err,response){

                        if(err){
                            var errMessage = errorHandler.getErrorMessage(err);
                            errorHandler.logErrorMessage(errMessage);
                            return res.status(400).send({
                            message: errMessage
                          });
                        }
                        else{
                          if(response){
                              if(response._id){
                                if(response.email){
                                  emails.push(response.email);
                                }
                                else emails.push("No email provided");
                                  if(emails.length == users.length)
                                    sendEmails();
                              }
                              else {
                                 return res.status(400).send({
                                    message: "User not found"
                                  })
                              }
                            }
                            else {
                              return res.status(400).send({
                                    message: "User not found"
                                  })
                              }
                            }

                      })
                      
                    }
                }
              }
            }
          })
        }
        else{
           return res.status(400).send({
          message: "Transaction not found"
        })
        }
      }
      else {
        return res.status(400).send({
        message: "Transaction not found"
        })
      }
     }
})
  function updateTransaction(request){
    request.emailsSent = true;
    request.save(function(err,result){
          if (err){
                var errMessage = errorHandler.getErrorMessage(err);
                errorHandler.logErrorMessage(errMessage);
                return res.status(400).send({message: 'Error while updating transaction in Merchant app, send email function'});
          }
          else return;

    })
  }
  function sendEmails(){
    var emailText = req.body.emailText;
    var emailSubject = req.body.emailSubject;

    var nodemailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');



        var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'siselup2017@gmail.com',
            pass: 'sep_2017'
        },
        tls: {rejectUnauthorized: false},
        debug:true
        }));


        for(var i=0; i<emails.length; i++){
          if(emails[i]!="No email provided"){
            var mailOptions={
                from : 'siselup2017@gmail.com',
                to : emails[i],
                subject : emailSubject,
                text : emailText
            }
            console.log(mailOptions);
            transporter.sendMail(mailOptions, function(error, response){
             if(error){
                    console.log(error);
             }else{
                    console.log("Message sent: " + response.message);
                 }
            });
          }
      }

      return res.status(200).send({
        emails: emails
      })
  }
  
}
