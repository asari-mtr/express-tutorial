import express from 'express'
let router = express.Router()

router.get('/', (req, res) => {
    res.clearCookie('name')
    res.send('cookie foo cleared')
})

export default router
