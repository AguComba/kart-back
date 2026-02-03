import { Track } from '../domain/Track';

export interface TrackRepository {
  create(track: Partial<Track>): Promise<Track>;
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | null>;
  update(id: string, track: Partial<Track>): Promise<Track | null>;
  delete(id: string): Promise<boolean>;
}
