import express from 'express'
let router = express.Router()

router.get('/static_file_test', (req, res) => {
    res.render('static_file_test')
})

export default router
