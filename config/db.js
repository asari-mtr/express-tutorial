var mongoose = require('mongoose');

var mongodbUri = process.env.MONGODB_URI || 'localhost';

var mongodbUrl = 'mongodb://' + mongodbUri + '/my_db';

mongoose.connect(mongodbUrl);

module.exports = mongoose;
