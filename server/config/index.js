var config;
if(process && process.env && process.env.NODE_ENV == 'prod') {
  console.log('NODE_ENV : ',process.env.NODE_ENV);
  config = require('./prod');
} else {
  console.log('NODE_ENV : ', 'dev');
  config = require('./dev');
}
module.exports = config;