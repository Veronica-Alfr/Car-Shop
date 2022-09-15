import express from 'express';
import 'express-async-errors';
import carsRoute from './routes/Car';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());

app.use('/cars', carsRoute);

app.use(errorHandler);

export default app;
