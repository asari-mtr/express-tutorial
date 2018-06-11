var express = require('express');
var router = express.Router();

var Person = require('../models/person.js');

router.get('/', function(req, res) {
    Person.find(function(err, response) {
        res.json(response);
    });
});

router.put('/:id', function(req, res) {
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
        if(err) res.json({message: 'Error in updating person with id ' + req.params.id});
        res.json(response);
    });
});

router.delete('/:id', function(req, res) {
    Person.findByIdAndRemove(req.params.id, function(err, response) {
        if(err) res.json({message: 'Error in deleting person with id ' + req.params.id});
        res.json({message: 'Person with id ' + req.params.id + ' removed.'});
    });
});

module.exports = router;
