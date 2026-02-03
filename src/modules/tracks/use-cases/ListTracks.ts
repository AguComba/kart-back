import { TrackRepository } from '../application/TrackRepository';
import { Track } from '../domain/Track';

export class ListTracks {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }
}
