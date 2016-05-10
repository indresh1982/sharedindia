var config = {};

config.port = 5555;
config.mongo = {};

config.bodyParser = {};
config.bodyParser.uploadLimit = '1mb';

config.email = {};
config.email.auth = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  connectionTimeout: 50000,
  auth: {
    user: 'sharedindia@gmail.com',
    pass: 'Ramsagar_143'
  }
};
config.email.verifyInfo = {
  from: 'sharedindia@gmail.com',
  subject: 'Shared India',
  html: 'User validation code: '
};


module.exports = config;