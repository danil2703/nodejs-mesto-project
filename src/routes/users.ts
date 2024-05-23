import { Router } from 'express';
import {
  createUser, getUserById, getUsers, updateAvatar, updateUser,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
