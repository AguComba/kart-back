import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../infrastructure/database/data-source';
import { KartSetup } from '../../domain/KartSetup';
import { KartSetupRepository } from '../../application/KartSetupRepository';

export class KartSetupRepositoryTypeOrm implements KartSetupRepository {
  private repository: Repository<KartSetup>;

  constructor() {
    this.repository = AppDataSource.getRepository(KartSetup);
  }

  async create(setup: Partial<KartSetup>): Promise<KartSetup> {
    const entity = this.repository.create(setup);
    return this.repository.save(entity);
  }

  async findAll(): Promise<KartSetup[]> {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<KartSetup | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<KartSetup>): Promise<KartSetup | null> {
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
