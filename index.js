var express = require('express');
var app = express();

app.use(require('./config/conifig.js'));

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
