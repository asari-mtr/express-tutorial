var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', function(req, res) {
    res.render('first_view');
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

app.listen(3000);
