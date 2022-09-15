import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class CarsService implements IService<ICar> {
  constructor(private _car:IModel<ICar>) {}

  public async create(obj:unknown): Promise<ICar & { _id: string }> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created as { _id: string } & ICar;
  }

  public async read():Promise<ICar[]> {
    const cars = await this._car.read();

    return cars;
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.ObjectNotFound);

    return car;
  }

  public async update(_id: string, payload: unknown):Promise<ICar & { _id: string; }> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.ObjectNotFound);

    return updated as ICar & { _id: string };
  }

  public async delete(_id: string):Promise<ICar> {
    const deleted = await this._car.delete(_id);
    console.log(deleted);

    if (!deleted) throw new Error(ErrorTypes.ObjectNotFound);

    return deleted;
  } 
}