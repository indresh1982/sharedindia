var MongoClient = require('mongodb').MongoClient;
var config = require('./../config/dev');

// Singleton
var Singleton = {
  // mongoHandler
  mongoHandler: function (req, res, next) {
    MongoClient.connect(config.mongo.uri, function(err, db) {
      req.db = db;
      next();
    });
  }
};

// exports
module.exports = Singleton;
