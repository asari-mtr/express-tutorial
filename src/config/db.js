var mongoose = require('mongoose');

var host = process.env.MONGODB_HOST || 'localhost';
var port = process.env.MONGODB_PORT || '27017';
var user = process.env.MONGODB_USER || '';
var pass = process.env.MONGODB_PASS || '';
var db = process.env.MONGODB_DB_NAME || 'my_db';

var credential = '';
if (user.length == 0 && pass.length == 0) {
  // NOP
} else if (user.length > 0 && pass.length > 0) {
  credential = user + ':' + pass + '@';
} else {
  throw new Error('Invalid modngdb user name or password');
}

var mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  mongodbUri = 'mongodb://' + credential + host + ':' + port + '/' + db;
}

mongoose.connect(mongodbUri);

module.exports = mongoose;
