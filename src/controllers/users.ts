import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { constants } from 'http2';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

const { ValidationError, CastError } = mongoose.Error;

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Передан некорректный id пользователя.'));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = res.locals.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};
