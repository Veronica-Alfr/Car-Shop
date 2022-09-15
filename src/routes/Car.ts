import { Router } from 'express';
import CarsController from '../controllers/Cars';
import CarsService from '../services/Cars';
import Cars from '../models/Cars';

const carsRoute = Router();

const cars = new Cars();
const carsService = new CarsService(cars);
const carsController = new CarsController(carsService);

carsRoute.post('/', (req, res) => carsController.create(req, res));
carsRoute.get('/', (req, res) => carsController.read(req, res));
carsRoute.get('/:id', (req, res) => carsController.readOne(req, res));
carsRoute.put('/:id', (req, res) => carsController.update(req, res));
carsRoute.delete('/:id', (req, res) => carsController.delete(req, res));

export default carsRoute;