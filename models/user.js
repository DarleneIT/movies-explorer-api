const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator(email) {
          return /.+@.+\..+/.test(email);
        },
        message: 'Введите корректный email',
      },
    },

    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },

    name: {
      type: String,
      default: 'Мария',
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя должно быть длиной от 2 до 30 символов',
      },
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пожалуйста, проверьте корректность почты или пароля 1');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Пожалуйста, проверьте корректность почты или пароля 2');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
