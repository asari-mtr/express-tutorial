var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var auth= require('./lib/auth.js');

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

app.get('/clear_cookie_name', function(req, res) {
    res.clearCookie('name');
    res.send('cookie foo cleared');
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send('received your request!');
});

var people = require('./routes/people.js');
app.use('/people', people);

var person = require('./routes/person.js');
app.use('/person', person);

app.use(auth);

var movies = require('./movies.js');
app.use('/movies', movies);

var errors = require('./errors.js');
app.use('/errors', errors );

app.listen(3000);
