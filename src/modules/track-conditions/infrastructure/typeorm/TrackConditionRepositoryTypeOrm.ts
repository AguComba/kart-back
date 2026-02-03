import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { TrackCondition } from '../../domain/TrackCondition';
import { TrackConditionRepository } from '../../application/TrackConditionRepository';

export class TrackConditionRepositoryTypeOrm implements TrackConditionRepository {
  private repository: Repository<TrackCondition>;

  constructor() {
    this.repository = AppDataSource.getRepository(TrackCondition);
  }

  async create(condition: Partial<TrackCondition>): Promise<TrackCondition> {
    const entity = this.repository.create(condition);
    return this.repository.save(entity);
  }

  async findLatestBySessionDay(sessionDayId: string): Promise<TrackCondition | null> {
    return this.repository.findOne({
      where: { sessionDayId },
      order: { createdAt: 'DESC' }
    });
  }
}
