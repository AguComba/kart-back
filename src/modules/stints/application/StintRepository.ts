import { Stint } from '../domain/Stint';

export interface StintRepository {
  create(stint: Partial<Stint>): Promise<Stint>;
  findById(id: string): Promise<Stint | null>;
  findLastBySessionDay(sessionDayId: string): Promise<Stint | null>;
  findBySessionDay(sessionDayId: string): Promise<Stint[]>;
  update(id: string, data: Partial<Stint>): Promise<Stint | null>;
  delete(id: string): Promise<boolean>;
}
