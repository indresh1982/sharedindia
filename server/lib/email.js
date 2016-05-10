var config = require('./../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config.email.auth);
var error = require('./../assets/errors').user.errors;

module.exports = {
  send: function (to, body, callback) {
    var email = Object.create(config.email.verifyInfo);
    email.to = to;
    email.html = body;
    /* transporter.sendMail(email, function (emailError, info) {
      if (emailError) {
        callback(emailError, {error: error.emailFail});
      } else { */
        callback(null, {status: 'success'});
      /* }
    }); */
  }
};
