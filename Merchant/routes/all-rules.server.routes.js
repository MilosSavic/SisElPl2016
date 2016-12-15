var allRules = require(appRoot+'/rules/all-rules.js');

module.exports = function(app){
	app.route('/api/allRules')
    .post(allRules.execute);
}