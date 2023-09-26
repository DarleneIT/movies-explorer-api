const { config } = require('dotenv');

const { SECRET_KEY = 'secret' } = process.env;
const { NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

if (NODE_ENV === 'production') {
  config();
}

module.exports = {
  SECRET_KEY, NODE_ENV, PORT, DB_URL,
};
