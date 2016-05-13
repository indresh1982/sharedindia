var userRepository = require('./userRepository');
var loginRepository = require('./loginRepository');
var apiFactory = require('./../../lib/apiFactory');

module.exports = function(options) {
  options = options || {prefixPath:'/user/'};
  var repo = userRepository();
  var repoLogin = loginRepository();

  return [{
      path: options.prefixPath + 'add',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['name', 'email', 'password'],
          repo.add
        );
      }
    },
    {
      path: options.prefixPath + 'verify',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email', 'vCode'],
          repo.verifyCode
        );
      }
    },
    {
      path:'resend',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email'],
          repo.resendCode
        );
      }
    },
    {
      path:'forget',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email'],
          repo.forgetPassword
        );
      }
    },
    {
      path: options.prefixPath + 'reset',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email', 'oldPassword', 'newPassword'],
          repo.resetPassword
        );
      }
    },
    {
      path: options.prefixPath + 'login',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email', 'password'],
          repo.login,
          repoLogin.login,
          1
        );
      }
    },
    {
      path: options.prefixPath + 'manage',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          ['email', 'password', 'searchEmail', 'right'],
          repo.manage
        );
      }
    },
    {
      path: options.prefixPath + 'logout',
      handler: function (req, res) {
        apiFactory.apiRequestHandler(
          req, res,
          [],
          repoLogin.logout
        );
      }
    }
  ];
}
