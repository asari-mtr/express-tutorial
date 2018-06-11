function router(app) {
  app.use(require('./routes/home.js'));
  app.use(require('./routes/auth.js'));
  app.use(require('./routes/static.js'));
  app.use('/clear_cookie_name', require('./routes/clear_cookie_name.js'));
  app.use('/people', require('./routes/people.js'));
  app.use('/person', require('./routes/person.js'));
  app.use('/movies', require('./routes/movies.js'));
  app.use('/errors', require('./routes/errors.js'));
}

module.exports = router;
