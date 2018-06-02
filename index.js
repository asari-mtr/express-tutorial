var express = require('express');
var app = express();

app.use('/static', express.static('public'));
app.use(express.static('images'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', function(req, res) {
    res.render('first_view');
});

app.get('/static_file_test', function(req, res) {
    res.render('static_file_test');
});

app.get('/dynamic_view', function(req, res) {
    res.render('dynamic', {
        name: "TutorialsPoint",
        url: "http://www.tutorialspoint.com"
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        user: {name: "Ayush", age: "20"}
    });
});

app.get('/components', function(req, res) {
    res.render('content');
});

app.listen(3000);
