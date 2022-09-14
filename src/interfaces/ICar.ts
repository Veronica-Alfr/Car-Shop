import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'Doors quantity (doorsQty) is required',
    invalid_type_error: 'Doors quantity (doorsQty) must be a number',
  }).int()    
    .gte(2)
    .lte(4),
  seatsQty: z.number({
    required_error: 'Seats quantity (seatsQty) is required',
    invalid_type_error: 'Seats quantity (seatsQty) must be a number',
  }).int()    
    .gte(2)
    .lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };