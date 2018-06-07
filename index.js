var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var auth= require('./lib/auth.js');
var db = require('./config/db.js');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: "Shh, its a secret!"}));

app.get('/', function(req, res) {
    if(req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page" + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

app.get('/clear_cookie_name', function(req, res) {
    res.clearCookie('name');
    res.send('cookie foo cleared');
});

app.post('/', function(req, res) {
    console.log(req.body);
    res.send("received your request!");
});

var personSchema = db.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = db.model("Person", personSchema);

app.get('/person', function(req, res) {
    res.render('person');
});

app.post('/person', function(req, res) {
    var personInfo = req.body;

    if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: "Sorry, you provided wrong info", type: "error"
        });
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save(function(err, Person) {
            if(err) {
                res.render('show_message', {message: "Database error", type: "error"});
            } else {
                res.render('show_message', {message: "New person added", type: "success", person: personInfo});
            }
        });
    }
});

app.get('/people', function(req, res) {
    Person.find(function(err, response) {
        res.json(response);
    });
});

app.put('/people/:id', function(req, res) {
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
        if(err) res.json({message: "Error in updating person with id " + req.params.id});
        res.json(response);
    });
});

app.delete('/people/:id', function(req, res) {
    Person.findByIdAndRemove(req.params.id, function(err, response) {
        if(err) res.json({message: "Error in deleting person with id " + req.params.id});
        res.json({message: "Person with id " + req.params.id + " removed."});
    });
});

app.use(auth);

var movies = require('./movies.js');
app.use('/movies', movies);

var errors = require('./errors.js');
app.use('/errors', errors );

app.listen(3000);
