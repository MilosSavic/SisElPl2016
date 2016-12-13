var sports = require(appRoot+'/controllers/sport.server.controller.js');

module.exports = function(app){
app.route('/api/sports')
    .get(sports.list)
    .post(sports.createSport);

app.route('/api/sports/:sportId')
    .get(sports.getSportById);
app.param('sportsId', sports.getSportById);
}