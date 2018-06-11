var db = require('../config/db.js');

var personSchema = db.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = db.model('Person', personSchema);

module.exports = Person;
