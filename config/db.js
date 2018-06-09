var mongoose = require('mongoose');

var DEFAULT_MONGODB_URL = 'mongodb://localhost/my_db';

mongoose.connect(process.env.MONGODB_URL || DEFAULT_MONGODB_URL);

module.exports = mongoose;
