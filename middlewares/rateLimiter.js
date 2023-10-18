const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Превышено количество запросов на сервер',
});

module.exports = limiter;
