import express from 'express'
let router = express.Router()

import Person from '../models/person.js'

router.get('/', (req, res) => {
    res.render('person')
})

router.post('/', (req, res) => {
    var personInfo = req.body

    if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: 'Sorry, you provided wrong info', type: 'error'
        })
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        })

        newPerson.save((err, Person) => {
            if(err) {
                res.render('show_message', {message: 'Database error', type: 'error'})
            } else {
                res.render('show_message', {message: 'New person added', type: 'success', person: personInfo})
            }
        })
    }
})

export default router
