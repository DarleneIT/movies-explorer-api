const route = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const login = require('./signin');
const createUser = require('./signup');


const NotFoundError = require('../errors/NotFound');

route.use('/signin', login);
route.use('/signup', createUser);



route.use('/movies', moviesRouter);
route.use('/users', usersRouter);

route.use('*', (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

module.exports = route;
