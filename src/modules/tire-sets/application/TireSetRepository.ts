import { TireSet } from '../domain/TireSet';

export interface TireSetRepository {
  create(tireSet: Partial<TireSet>): Promise<TireSet>;
  findAll(): Promise<TireSet[]>;
  findById(id: string): Promise<TireSet | null>;
  update(id: string, data: Partial<TireSet>): Promise<TireSet | null>;
  delete(id: string): Promise<boolean>;
}
