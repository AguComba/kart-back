import { SessionDay } from '../domain/SessionDay';

export interface SessionDayRepository {
  create(sessionDay: Partial<SessionDay>): Promise<SessionDay>;
  findAllWithTrack(): Promise<SessionDay[]>;
  findById(id: string): Promise<SessionDay | null>;
  findByIdWithDetails(id: string): Promise<SessionDay | null>;
  update(id: string, sessionDay: Partial<SessionDay>): Promise<SessionDay | null>;
  delete(id: string): Promise<boolean>;
}
