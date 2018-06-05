var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');

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

mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = mongoose.model("Person", personSchema);

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

var Users = [];

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
    if(!req.body.id || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
    } else {
        var u = Users.filter(function(user) {
            if(user.id === req.body.id) {
                res.render('signup', {
                    message: "User Already Exists! Login or choose another user id"});
                return user;
            }
        });
        if(u.length == 0) {
          var newUser = {id: req.body.id, password: req.body.password};
          Users.push(newUser);
          req.session.user = newUser;
          res.redirect('/protected_page');
        }
    }
});

function checkSignIn(req, res, next) {
    if(req.session.user){
        return next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        return next(err);
    }
}

app.get('/protected_page', checkSignIn, function(req, res) {
    res.render('protected_page', {id: req.session.user.id});
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    if(!req.body.id || !req.body.password){
        res.render('login', {message: "Please enter both id and password"});
    } else {
        var u = Users.filter(function(user) {
            if(user.id === req.body.id && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/protected_page');
                return user;
            }
        });
        if(u.length == 0) {
          res.render('login', {message: "Invalid credentials!"});
        }
    }
});

app.get("/logout", function(req, res) {
    req.session.destroy(function() {
        console.log("user logged out.");
    });
    res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next) {
    console.log(err);
    res.redirect('/login');
});

app.listen(3000);
