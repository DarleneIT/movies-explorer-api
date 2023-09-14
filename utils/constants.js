const { config } = require('dotenv');

const { SECRET_KEY = 'secret' } = process.env;

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

module.exports = { SECRET_KEY };
