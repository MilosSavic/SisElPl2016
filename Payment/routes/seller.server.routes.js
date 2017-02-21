var sellers = require(appRoot+'/controllers/seller.server.controller.js');

module.exports = function(app){
app.route('/api/sellers')
    .get(sellers.list)
    .post(sellers.createSeller);

}