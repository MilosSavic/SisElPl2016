var transactions = require(appRoot+'/controllers/transaction.server.controller.js');

module.exports = function(app){
app.route('/api/transactions')
    .get(transactions.list)
    .post(transactions.createTransaction);


app.route('/api/transactions/:transactionId')
    .get(transactions.getTransactionById);
app.param('transactionId', transactions.getTransactionById);


}