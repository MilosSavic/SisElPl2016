var communicationServices = require(appRoot+'/controllers/communication.server.controller.js');

module.exports = function(app){
	app.route('/api/getURL')
	.get(communicationServices.getURL)
    .post(communicationServices.getURL);
}