var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var err = new Error("Something went wrong");
    next(err);
});

router.use(function(err, req, res, next){
    res.status(500);
    res.send("Ooops, something went wrong");
});

module.exports = router;
