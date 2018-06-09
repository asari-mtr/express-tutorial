var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: 'Shh, its a secret!'}));

app.get('/', function(req, res) {
    if(req.session.page_views) {
        req.session.page_views++;
        res.send('You visited this page' + req.session.page_views + ' times');
    } else {
        req.session.page_views = 1;
        res.send('Welcome to this page for the first time!');
    }
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send('received your request!');
});

app.use(require('./routers.js'));

app.listen(3000);
