var merchants = require(appRoot+'/controllers/merchant.server.controller.js');

module.exports = function(app){
app.route('/api/merchants')
    .get(merchants.list)

}