var regions = require(appRoot+'/controllers/region.server.controller.js');

module.exports = function(app){
	app.route('/api/regions')
    .get(regions.list)
    .post(regions.createRegion);

app.route('/api/regions/:regionId')
    .get(regions.getRegionById);
app.param('regionId', regions.getRegionById);
}