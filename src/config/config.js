function config(express, app) {
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var upload = multer();
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  var pug = require('pug');

  app.set('view engine', 'pug');
  app.set('views', __dirname + '/views');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(upload.array());
  app.use(cookieParser());
  app.use(express.static('public'));
  app.use(session({secret: 'Shh, its a secret!'}));
}

module.exports = config;
