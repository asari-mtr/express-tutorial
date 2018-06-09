var express = require('express');
var app = express();

app.use(require('./routes/auth.js'));
app.use('/clear_cookie_name', require('./routes/clear_cookie_name.js'));
app.use('/people', require('./routes/people.js'));
app.use('/person', require('./routes/person.js'));
app.use('/movies', require('./routes/movies.js'));
app.use('/errors', require('./routes/errors.js'));

module.exports = app;
