var houseInsurances = require(appRoot+'/controllers/house-insurance.server.controller.js');

module.exports = function(app){

app.route('/api/houseInsurances')
    .get(houseInsurances.list)
    .post(houseInsurances.createHouseInsurance);
	
	
app.route('/api/houseInsurances/:hid')
    .get(houseInsurances.getHouseInsuranceById);
app.param('hid', houseInsurances.getHouseInsuranceById);

}