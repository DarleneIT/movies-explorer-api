const mongoose = require('mongoose');

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const cardSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" должно быть заполнено'],
    },

    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },

    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },

    year: {
      type: Number,
      required: [true, 'Поле "year" должно быть заполнено'],
    },

    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    image: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Введите корректный URL',
      },
    },

    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Введите корректный URL',
      },
    },

    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Введите корректный URL',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true],
    },

    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },

    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },

    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', cardSchema);
