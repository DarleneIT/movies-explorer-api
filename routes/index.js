const route = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const login = require('./signin');
const createUser = require('./signup');

const NotFoundError = require('../errors/NotFound');

route.use('/signin', login);
route.use('/signup', createUser);

const auth = require('../middlewares/auth');

route.use(auth);

route.use('/movies', auth, moviesRouter);
route.use('/users', auth, usersRouter);

route.use('*', (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

module.exports = route;
