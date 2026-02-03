import { Repository } from 'typeorm';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { Track } from '../../domain/Track';
import { TrackRepository } from '../../application/TrackRepository';

export class TrackRepositoryTypeOrm implements TrackRepository {
  private repository: Repository<Track>;

  constructor() {
    this.repository = AppDataSource.getRepository(Track);
  }

  async create(track: Partial<Track>): Promise<Track> {
    const entity = this.repository.create(track);
    return this.repository.save(entity);
  }

  async findAll(): Promise<Track[]> {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Track | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, track: Partial<Track>): Promise<Track | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }
    const merged = this.repository.merge(existing, track);
    return this.repository.save(merged);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}
