import { TrackRepository } from '../application/TrackRepository';
import { Track } from '../domain/Track';

export class UpdateTrack {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(id: string, data: Partial<Track>): Promise<Track | null> {
    return this.trackRepository.update(id, data);
  }
}
