require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();

const corsOptions = {
  origin: [
    'https://allmovies.nomoredomainsrocks.ru',
    'http://allmovies.nomoredomainsrocks.ru',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
