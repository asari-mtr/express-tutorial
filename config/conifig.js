var express = require('express');
var config = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');

config.set('view engine', 'pug');
config.set('views', './views');

config.use(bodyParser.json());
config.use(bodyParser.urlencoded({ extended: true }));
config.use(upload.array());
config.use(cookieParser());
config.use(express.static('public'));
config.use(session({secret: 'Shh, its a secret!'}));

module.exports = config;
