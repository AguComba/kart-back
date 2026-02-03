import { TrackRepository } from '../application/TrackRepository';
import { Track } from '../domain/Track';

export class CreateTrack {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(data: Partial<Track>): Promise<Track> {
    return this.trackRepository.create(data);
  }
}
