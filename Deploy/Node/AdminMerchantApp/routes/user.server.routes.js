var users = require(appRoot+'/controllers/user.server.controller.js');
module.exports = function(app){

app.route('/api/users')
    .get(users.list)
    .post(users.createUser);

app.route('/api/users/:userId')
    .get(users.getUserById);
app.param('userId', users.getUserById);

}