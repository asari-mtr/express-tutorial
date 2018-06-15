function config(express, app) {
    let bodyParser = require('body-parser')
    let multer = require('multer')
    let upload = multer()
    let session = require('express-session')
    let cookieParser = require('cookie-parser')

    app.set('view engine', 'pug')
    app.set('views', './views')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(upload.array())
    app.use(cookieParser())
    app.use(express.static('public'))
    app.use(session({secret: 'Shh, its a secret!'}))
}

module.exports = config
