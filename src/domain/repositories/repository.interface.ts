import { Entity } from "../entities/entity";

export interface IRepository<E extends Entity> {
  findById(id: string): Promise<E>;
  save(entity: E): Promise<void>;
}
