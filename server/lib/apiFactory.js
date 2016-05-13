var error = require('./../assets/errors').global.errors;

// Singleton
var Singleton = {
  // Api Request Handler
  apiRequestHandler: function (req, res, reqPara, repoMethod, repoMethodNext, resultIndex) {
    var args = {};
    if(req.body || reqPara.length == 0) {
      for (var i = 0; i < reqPara.length; i++) {
        if (req.body[reqPara[i]]) {
          args[reqPara[i]] = req.body[reqPara[i]];
        } else {
          res.send({error:error.infoMissing}); //required data missing
          return;
        }
      }
    } else {
      res.send({error:error.infoMissing}); //required data missing
      return;
    }
    args.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    repoMethod(req.db, args, function(err, result) {
      if(err) {
        res.send(err);
        return;
      }
      if(!repoMethodNext) {
        res.send(result);
      } else {
        repoMethodNext(req.db, args, function(errNext, resultNext) {
          if(errNext) {
            res.send(errNext);
            return;
          }
          if(resultIndex == 2) {
            res.send(resultNext);
          } else {
            res.send(result);
          }
        });
      }
    });
  }
};

// exports
module.exports = Singleton;
