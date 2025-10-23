import { ICrud } from "../interfaces/crud.interface";

export abstract class CrudService<T> implements ICrud<T> {
    abstract create(data: T): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: string): Promise<T | null>;
    abstract update(id: string, data: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<void>;
}