var carInsuranceRules = require(appRoot+'/rules/rules.car-insurance.js');
module.exports = function(app){
	app.route('/api/carInsuranceRules')
    .post(carInsuranceRules.execute);
}