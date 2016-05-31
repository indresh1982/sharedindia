var locRepository = require('./locRepository');
var apiFactory = require('./../../lib/apiFactory');

module.exports = function(options) {
  options = options || {prefixPath:'/location/'};
  var repo = locRepository();

  return [
    {
      path: options.prefixPath + 'add',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['name', 'type', 'pCity', 'pDist', 'pState', 'latitude', 'longitude'],
          repo.add
        );
      }
    }
  ];
}
