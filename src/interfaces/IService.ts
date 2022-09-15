export interface IService<T> {
  create(obj:unknown):Promise<T & { _id: string }>,
  read():Promise<T[]>,
  readOne(_id:string):Promise<T>,
  update(_id: string, payload: unknown): Promise<T & { _id: string }>,
  delete(_id: string):Promise<T>,
}