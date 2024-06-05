import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt;
  const secret = process.env.JWT_SECRET || 'some-secret-key';

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new UnauthorizedError('С токеном что-то не так.'));
  }

  res.locals.user = payload;

  return next();
};

export default authMiddleware;
