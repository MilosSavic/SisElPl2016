var insurances = require(appRoot+'/controllers/insurance.server.controller.js');
module.exports = function(app){

app.route('/api/insurances')
    .get(insurances.list)
    .post(insurances.createInsurance);

app.route('/api/insurances/:id')
    .get(insurances.getInsuranceById);
app.param('id', insurances.getInsuranceById);

}