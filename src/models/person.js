import db from '../config/db'

const personSchema = db.Schema({
    name: String,
    age: Number,
    nationality: String
})

const Person = db.model('Person', personSchema)

export default Person
