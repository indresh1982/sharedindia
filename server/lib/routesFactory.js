// Singleton
var Singleton = {
  // Set Routes
  setRoutes: function (app, routes) {
    for (var i = 0; i < routes.length; i++) {
      app.use(routes[i].path, routes[i].handler);
    }
  }
};

// exports
module.exports = Singleton;
