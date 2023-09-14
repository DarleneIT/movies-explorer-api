require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('express').Router();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const login = require('./routes/index');
const createUser = require('./routes/index');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFound');
const error = require('./middlewares/error');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/movies' } = process.env;
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:4000',
    'http://localhost:4001',
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

app.use('/', router);
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/movies', auth, moviesRouter);
app.use('/users', auth, usersRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
