var express = require('express');
var router = express.Router();

router.get('/static_file_test', function(req, res) {
  res.render('static_file_test');
});

module.exports = router;
