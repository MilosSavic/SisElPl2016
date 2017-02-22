var payments = require(appRoot+'/controllers/payment.server.controller.js');

module.exports = function(app){
app.route('/api/payments')
    .get(payments.list)
    .post(payments.createPayment);

app.route('/api/payments/:paymentId')
    .put(payments.updatePayment);
app.param('paymentId', payments.updatePayment);

}