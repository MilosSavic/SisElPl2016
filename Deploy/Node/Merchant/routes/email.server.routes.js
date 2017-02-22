var emails = require(appRoot+'/controllers/email.server.controller.js');

module.exports = function(app){
app.route('/api/sendEmail')
    .post(emails.sendEmail)

}