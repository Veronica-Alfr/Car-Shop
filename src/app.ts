import express from 'express';
import carsRoute from './routes/Car';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());

app.use(carsRoute);
app.use(errorHandler);

export default app;
