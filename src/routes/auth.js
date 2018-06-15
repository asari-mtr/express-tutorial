var express = require('express')
var router = express.Router()

var Users = []

function getSignup(req, res) {
    res.render('signup')
}

function postSignup(req, res) {
    if(!req.body.id || !req.body.password) {
        res.status('400')
        res.send('Invalid details!')
    } else {
        var u = Users.filter((user) => {
            if(user.id === req.body.id) {
                res.render('signup', {
                    message: 'User Already Exists! Login or choose another user id'})
                return user
            }
        })
        if(u.length == 0) {
            var newUser = {id: req.body.id, password: req.body.password}
            Users.push(newUser)
            req.session.user = newUser
            res.redirect('/protected_page')
        }
    }
}

function checkSignIn(req, res, next) {
    if(req.session.user){
        return next()
    } else {
        var err = new Error('Not logged in!')
        console.log(req.session.user)
        return next(err)
    }
}

function getProtectedPage(req, res) {
    res.render('protected_page', {id: req.session.user.id})
}

function errorProtectedPage(err, req, res, next) {
    console.log(err)
    res.redirect('/login')
}

function getLogin(req, res) {
    res.render('login')
}

function postLogin(req, res) {
    if(!req.body.id || !req.body.password){
        res.render('login', {message: 'Please enter both id and password'})
    } else {
        let u = Users.filter((user) => {
            if(user.id === req.body.id && user.password === req.body.password) {
                req.session.user = user
                res.redirect('/protected_page')
                return user
            }
        })
        if(u.length == 0) {
            res.render('login', {message: 'Invalid credentials!'})
        }
    }
}

function getLogout(req, res) {
    req.session.destroy(() => {
        console.log('user logged out.')
    })
    res.redirect('/login')
}

router.get('/signup', getSignup)
router.post('/signup', postSignup)
router.get('/protected_page', checkSignIn, getProtectedPage)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get('/logout', getLogout)
// error handling
router.use('/protected_page', errorProtectedPage)

export default router
