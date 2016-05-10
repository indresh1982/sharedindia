var mongo = require('mongodb');

module.exports = function create(options, deps) {
  var collectionName = 'login';

  return {
    login: function (db, criteria, callback) {
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.ip = criteria.ip;
      collection.remove(args, function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          args.email = criteria.email;
          args.cDate = new Date();
          collection.insert(args, callback);
        }
      });
    },

    logout: function (db, criteria, callback) {
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.ip = criteria.ip;
      collection.remove(args, callback);
    }
  }
};
