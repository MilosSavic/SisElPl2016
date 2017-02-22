var mainServices = require(appRoot+'/controllers/communication.server.controller.js');

module.exports = function(app){
app.route('/api/getURLandID')
	.get(mainServices.getURLandID)
    .post(mainServices.getURLandID);
	
app.route('/api/checkCodeValidity')
	.get(mainServices.checkCodeValidity)
	.post(mainServices.checkCodeValidity);

}