import express from 'express'
let router = express.Router()

router.get('/', (req, res) => {
    var err = new Error('Something went wrong')
    next(err)
})

router.use((err, req, res, next) => {
    res.status(500)
    res.send('Ooops, something went wrong')
})

export default router
