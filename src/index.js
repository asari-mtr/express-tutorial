var express = require('express');
var app = express();

require(__dirname + '/config/config.js')(express, app);
require(__dirname +'/routers.js')(app);

app.listen(process.env.PORT || 3000);
