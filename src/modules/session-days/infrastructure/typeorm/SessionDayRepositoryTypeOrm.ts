import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { SessionDay } from '../../domain/SessionDay';
import { SessionDayRepository } from '../../application/SessionDayRepository';

export class SessionDayRepositoryTypeOrm implements SessionDayRepository {
  private repository: Repository<SessionDay>;

  constructor() {
    this.repository = AppDataSource.getRepository(SessionDay);
  }

  async create(sessionDay: Partial<SessionDay>): Promise<SessionDay> {
    const entity = this.repository.create(sessionDay);
    return this.repository.save(entity);
  }

  async findAllWithTrack(): Promise<SessionDay[]> {
    return this.repository.find({
      relations: {
        track: true,
        conditions: true,
        stints: true
      },
      order: {
        date: 'DESC',
        conditions: { createdAt: 'DESC' }
      }
    });
  }

  async findById(id: string): Promise<SessionDay | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByIdWithDetails(id: string): Promise<SessionDay | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        track: true,
        conditions: true,
        stints: {
          tireSet: true,
          kartSetup: true,
          gearRatio: true
        }
      },
      order: {
        conditions: { createdAt: 'DESC' },
        stints: { stintNumber: 'ASC' }
      }
    });
  }

  async update(id: string, sessionDay: Partial<SessionDay>): Promise<SessionDay | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }
    const merged = this.repository.merge(existing, sessionDay);
    return this.repository.save(merged);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}
