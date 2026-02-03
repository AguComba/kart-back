import { TrackRepository } from '../application/TrackRepository';

export class DeleteTrack {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.trackRepository.delete(id);
  }
}
