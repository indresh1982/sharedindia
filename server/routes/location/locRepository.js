var mongo = require('mongodb');
var error = require('./../../assets/errors').location.errors;

module.exports = function create(options, deps) {
  var collectionName = 'locations';

  return {
    getStates: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      collection.find(args, projection).toArray(function (err, result) {
        callback(err, result);
      });
    },

    add: function (db, criteria, callback) {
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.name = criteria.name;
      args.type = criteria.type;
      if(criteria.pCity && criteria.pCity != 'NA') {
        args.pCity = criteria.pCity;
      } else {
        if(args.type == 0) {
          callback(null, {error:error.cityMissing});
        }
      }
      if(criteria.pDist && criteria.pDist != 'NA') {
        args.pDist = criteria.pDist;
      } else {
        if(args.type == 0 || args.type == 1) {
          callback(null, {error:error.distMissing});
        }
      }
      if(criteria.pState && criteria.pState != 'NA') {
        args.pState = criteria.pState;
      } else {
        if(args.type == 0 || args.type == 1 || args.type == 2) {
          callback(null, {error:error.stateMissing});
        }
      }
      args.latitude = criteria.latitude;
      args.longitude = criteria.longitude;
      collection.insert(args, function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          callback(null, {status: 'success', data:result});
        }
      });
    }
  }
};
