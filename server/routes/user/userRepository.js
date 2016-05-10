var mongo = require('mongodb');
var email = require('./../../lib/email');
var error = require('./../../assets/errors').user.errors;

module.exports = function create(options, deps) {
  var collectionName = 'users';

  return {
    add: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      collection.find(args, projection).toArray(function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          if(result.length > 0 && result[0].verified === false) {
            callback(null, {error:error.emailNVerified});
          } else if(result.length > 0 && result[0].verified === true) {
            callback(null, {error:error.emailVerified});
          } else {
            args.name = criteria.name;
            args.password = criteria.password;
            args.ip = criteria.ip;
            args.type = 0;
            args.verificationCode = Math.floor((Math.random() * 999999) + 100000).toString();
            args.verified = false;
            args.cDate = new Date();
            collection.insert(args, function (error, result) {
              if(err) {
                callback(error, result);
              } else {
                email.send(result.ops[0].email,
                  '\<p\>User validation code: \<b\>' + result.ops[0].verificationCode + '\<\/b\>\<\/p\>',
                  callback);
              }
            });
          }
        }
      });
    },

    resendCode: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      collection.find(args, projection).toArray(function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          if(result.length > 0 && result[0].verified === false) {
            email.send(result[0].email,
              '\<p\>User validation code: \<b\>' + result[0].verificationCode + '\<\/b\>\<\/p\>',
              callback);
          } else if(result.length > 0 && result[0].verified === true) {
            callback(null, {error:error.emailVerified}); //record is already exist and verified
          } else {
            callback(null, {error:error.emailNReg});
          }
        }
      });
    },

    forgetPassword: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      collection.find(args, projection).toArray(function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          if(result.length > 0 && result[0].verified === false) {
            callback(null, {error:error.emailNVerified});
          } else if(result.length > 0 && result[0].verified === true) {
            email.send(result[0].email,
              '\<p\>Password: \<b\>' + result[0].password + '\<\/b\>\<\/p\>',
              callback);
          } else {
            callback(null, {error:error.emailNReg});
          }
        }
      });
    },

    verifyCode: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      args.verificationCode = criteria.verificationCode
      collection.update(args, {$set: {verified:true}}, {}, function (err, resData) {
        if(err) {
          callback(err, resData);
        } else {
          if(resData.result.n == 1 && resData.result.nModified == 1) {
            callback(null, {status: 'success'});
          } else if(resData.result.n == 1 && resData.result.nModified == 0) {
            callback(null, {error:error.emailVerified});
          } else {
            callback(null, {error:error.emailNReg});
          }
        }
      });
    },

    resetPassword: function (db, criteria, callback) {
      var projection = { };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      args.password = criteria.oldPassword;
      collection.update(args, {$set: {password:criteria.newPassword}}, {}, function (err, resData) {
        if(err) {
          callback(err, resData);
        } else {
          if(resData.result.n == 1 && resData.result.nModified == 1) {
            callback(null, {status: 'success'});
          } else if(resData.result.n == 1 && resData.result.nModified == 0) {
            callback(null, {error:error.emailSamePassword});
          } else {
            callback(null, {error:error.emailPassword});
          }
        }
      });
    },

    login: function (db, criteria, callback) {
      var projection = { name:1, email:1, type:1, verified:1 };
      var collection = db.collection(collectionName);
      var args = {};
      criteria = criteria || {};
      args.email = criteria.email;
      args.password = criteria.password;
      collection.find(args, projection).toArray(function (err, result) {
        if(err) {
          callback(err, result);
        } else {
          if(result.length > 0 && result[0].verified === false) {
            callback(null, {error:error.emailNVerified});
          } else if(result.length > 0 && result[0].verified === true) {
            callback(null, {status:'success', data:result[0]});
          } else {
            callback(null, {error:error.emailNReg});
          }
        }
      });
    }
  }
};
