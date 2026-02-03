import { TrackRepository } from '../application/TrackRepository';
import { Track } from '../domain/Track';

export class GetTrack {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(id: string): Promise<Track | null> {
    return this.trackRepository.findById(id);
  }
}
