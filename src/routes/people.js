import express from 'express'
let router = express.Router()

import Person from '../models/person'

router.get('/', (req, res) => {
    Person.find((err, response) => {
        res.json(response)
    })
})

router.put('/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
        if(err) res.json({message: 'Error in updating person with id ' + req.params.id})
        res.json(response)
    })
})

router.delete('/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id, (err, response) => {
        if(err) res.json({message: 'Error in deleting person with id ' + req.params.id})
        res.json({message: 'Person with id ' + req.params.id + ' removed.'})
    })
})

export default router
