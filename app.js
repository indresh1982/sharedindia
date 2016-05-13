var express = require('express');
var config = require('./server/config');
var mongodb = require('./server/lib/mongodb');
var routesFactory = require('./server/lib/routesFactory');
var bodyParser = require('body-parser');
var app = express();
var apiPublic = express.Router();
var apiProtected = express.Router();

app.set('port', process.env.PORT||config.port||5555);

//static content and web app
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json({limit: config.bodyParser.uploadLimit}));

//database connection
app.use(mongodb.mongoHandler);

//public api register
app.use('/api/public', apiPublic);

//Protected api register
app.use('/api/protected', function (req, res, next) {
  var auth = true; //TODO need to check here login
  if(!auth) {
    res.send({login:'failed'}).status(401);
  }
  next();
});
app.use('/api/protected', apiProtected);

//test public route
apiPublic.use('/test', function (req, res) {
  res.send({result: 'test public route'});
});
routesFactory.setRoutes(apiPublic, require('./server/routes/user/userRoutes')());


//test protected route
apiProtected.use('/test', function (req, res) {
  res.send({result: 'test protected route'});
});

module.exports = app;
