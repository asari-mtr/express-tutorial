var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.clearCookie('name');
    res.send('cookie foo cleared');
});

module.exports = router;
