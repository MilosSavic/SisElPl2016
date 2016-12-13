var carInsuranceServices = require(appRoot+'/controllers/car-insurance-service.server.controller.js');

module.exports = function(app){
	
app.route('/api/carInsuranceServices')
    .get(carInsuranceServices.list)
    .post(carInsuranceServices.createCarInsuranceService);

}