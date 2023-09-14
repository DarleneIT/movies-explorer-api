const mongoose = require('mongoose');
const Movie = require('../models/movie');

const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');

// Показать сохраненные пользователем фильмы
module.exports.getMovies = (_, res, next) => {
  Movie.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// Добавить новый фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удалить фильм пользователя
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }
      Movie.deleteOne(card)
        .orFail()
        .then(() => {
          res.status(200).send({ message: 'Фильм удалён' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Фильм с таким id не найден'));
          } else if (err instanceof mongoose.Error.CastError) {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        next(new NotFoundError('Фильм с таким id не найден'));
      } else {
        next(err);
      }
    });
};
