var config = require('./../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config.email.auth);
var error = require('./../assets/errors').user.errors;

module.exports = {
  send: function (to, body, callback) {
    var email = Object.create(config.email.verifyInfo);
    email.to = to;
    email.html = body;
    console.log('config.email.sendAllow : ', config.email.sendAllow);
    if(config.email.sendAllow) {
      transporter.sendMail(email, function (emailError, info) {
        if (emailError) {
          callback(null, {error: error.emailFail});
        } else {
          callback(null, {status: 'success'});
        }
      });
    } else {
      console.log('Email is disable for dev.');
      callback(null, {status: 'success'});
    }
  }
};
