import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../infrastructure/database/data-source';
import { Stint } from '../../domain/Stint';
import { StintRepository } from '../../application/StintRepository';

export class StintRepositoryTypeOrm implements StintRepository {
  private repository: Repository<Stint>;

  constructor() {
    this.repository = AppDataSource.getRepository(Stint);
  }

  async create(stint: Partial<Stint>): Promise<Stint> {
    const entity = this.repository.create(stint);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<Stint | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findLastBySessionDay(sessionDayId: string): Promise<Stint | null> {
    return this.repository.findOne({
      where: { sessionDayId },
      order: { stintNumber: 'DESC', createdAt: 'DESC' }
    });
  }

  async findBySessionDay(sessionDayId: string): Promise<Stint[]> {
    return this.repository.find({
      where: { sessionDayId },
      order: { stintNumber: 'ASC' },
      relations: {
        tireSet: true,
        kartSetup: true,
        gearRatio: true
      }
    });
  }

  async update(id: string, data: Partial<Stint>): Promise<Stint | null> {
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
