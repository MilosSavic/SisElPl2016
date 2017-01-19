var houseInsuranceCategories = require(appRoot+'/controllers/house-insurance-category.server.controller.js');

module.exports = function(app){

app.route('/api/houseInsuranceCategories')
    .get(houseInsuranceCategories.list)
    .post(houseInsuranceCategories.createHouseInsuranceCategory);
}