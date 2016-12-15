var userRules = require(appRoot+'/rules/rules.user.js');

module.exports = function(app){
	app.route('/api/userRules')
    .post(userRules.execute);
}