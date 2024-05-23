import { NextFunction, Request, Response } from 'express';
import { AuthContext } from '../types/auth-context';

const authMiddleware = (req: Request, res: Response<unknown, AuthContext>, next: NextFunction) => {
  res.locals.user = {
    _id: '66478dbb24ec45877d306588',
  };

  next();
};

export default authMiddleware;
