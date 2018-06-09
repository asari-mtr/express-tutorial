var express = require('express');
var app = express();

require('./config/config.js')(express, app);
require('./routers.js')(app);

app.listen(3000);
