import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { TireSet } from '../../domain/TireSet';
import { TireSetRepository } from '../../application/TireSetRepository';

export class TireSetRepositoryTypeOrm implements TireSetRepository {
  private repository: Repository<TireSet>;

  constructor() {
    this.repository = AppDataSource.getRepository(TireSet);
  }

  async create(tireSet: Partial<TireSet>): Promise<TireSet> {
    const entity = this.repository.create(tireSet);
    return this.repository.save(entity);
  }

  async findAll(): Promise<TireSet[]> {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<TireSet | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<TireSet>): Promise<TireSet | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }
    const merged = this.repository.merge(existing, data);
    return this.repository.save(merged);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}
