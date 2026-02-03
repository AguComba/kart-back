import { SessionDayRepository } from '../application/SessionDayRepository';
import { SessionDay } from '../domain/SessionDay';

export class ListSessionDays {
  constructor(private readonly sessionDayRepository: SessionDayRepository) {}

  async execute(): Promise<SessionDay[]> {
    return this.sessionDayRepository.findAllWithTrack();
  }
}
