import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middleware/erorr-handler';
import authMiddleware from './middleware/auth-middleware';
import routeNotFound from './middleware/route-not-found';

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(MONGO_URL);

app.use(authMiddleware);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', routeNotFound);

app.use(errorHandler);

app.listen(PORT);
