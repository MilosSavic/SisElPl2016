var houseInsuranceRules = require(appRoot+'/rules/rules.house-insurance.js');

module.exports = function(app){	
app.route('/api/houseInsuranceRules')
    .post(houseInsuranceRules.execute);
}