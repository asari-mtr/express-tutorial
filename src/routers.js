import things from './things'
import home from './routes/home'
import auth from './routes/auth'
import static_route from './routes/static'
import clear_cookie_name from './routes/clear_cookie_name.js'
import people from './routes/people'
import person from './routes/person'
import movies from './routes/movies'
import errors from './routes/errors'

export default function router(app) {
    app.use(home)
    app.use(auth)
    app.use(static_route)
    app.use('/clear_cookie_name', clear_cookie_name)
    app.use('/people', people)
    app.use('/person', person)
    app.use('/movies', movies)
    app.use('/errors', errors)
    app.use('/things', things)
}
