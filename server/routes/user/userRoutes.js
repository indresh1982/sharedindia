var userRepository = require('./userRepository');
var loginRepository = require('./loginRepository');
var error = require('./../../assets/errors').user.errors;

module.exports = function(options, deps) {
  var repo = (deps && deps.userRepository) || userRepository();
  var repoLogin = (deps && deps.loginRepository) || loginRepository();

  return {
    add: function (req, res) {
      if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
        res.send({error:error.infoMissing}); //required data missing
        return;
      }
      var args = {}
      args.name = req.body.name;
      args.email = req.body.email;
      args.password = req.body.password;
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repo.add(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        res.send(result);
      });
    },
    verify: function (req, res) {
      if(!req.body || !req.body.email || !req.body.vCode) {
        res.send({error:error.infoMissing}); //required data missing
        return;
      }
      var args = {}
      args.email = req.body.email;
      args.verificationCode = req.body.vCode;
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repo.verifyCode(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        res.send(result);
      });
    },
    resend: function (req, res) {
      if(!req.body || !req.body.email) {
        res.send({error:error.infoMissing}); //required data missing
        return;
      }
      var args = {}
      args.email = req.body.email;
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repo.resendCode(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        res.send(result);
      });
    },
    reset: function (req, res) {
      if(!req.body || !req.body.email || !req.body.oldPassword || !req.body.newPassword) {
        res.send({error:error.infoMissing}); //required data missing
        return;
      }
      var args = {}
      args.email = req.body.email;
      args.oldPassword = req.body.oldPassword;
      args.newPassword = req.body.newPassword;
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repo.resetPassword(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        res.send(result);
      });
    },
    login: function (req, res) {
      if(!req.body || !req.body.email || !req.body.password) {
        res.send({error:error.infoMissing}); //required data missing
        return;
      }
      var args = {}
      args.email = req.body.email;
      args.password = req.body.password;
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repo.login(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        repoLogin.login(req.db, args, function(errLogin) {
          if(errLogin) {
            res.send(errLogin);
            return;
          }
          res.send(result);
        });
      });
    },
    logout: function (req, res) {
      var args = {}
      args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      repoLogin.logout(req.db, args, function(err, result) {
        if(err) {
          res.send(err);
          return;
        }
        res.send({status:'success'});
      });
    }
  };
}
