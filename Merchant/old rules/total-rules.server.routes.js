var totalRules = require(appRoot+'/rules/rules.total.js');

module.exports = function(app){	
app.route('/api/totalRules')
    .post(totalRules.execute);
}
