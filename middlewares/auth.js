const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/Unauthorized');

const { SECRET_KEY = 'secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Пожалуйста, пройдите авторизацию сервиса Movies');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Пожалуйста, пройдите авторизацию сервиса Movies');
  }

  req.user = payload;
  next();
};
