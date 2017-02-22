var amounts = require(appRoot+'/controllers/amount.server.controller.js');

module.exports = function(app){
app.route('/api/amounts')
    .get(amounts.list)
    .post(amounts.createAmount);

app.route('/api/amounts/:amountId')
    .get(amounts.getAmountById);
app.param('amountId', amounts.getAmountById);

}