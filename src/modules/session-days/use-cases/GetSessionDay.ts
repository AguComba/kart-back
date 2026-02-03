import { SessionDayRepository } from '../application/SessionDayRepository';
import { SessionDay } from '../domain/SessionDay';

export class GetSessionDay {
  constructor(private readonly sessionDayRepository: SessionDayRepository) {}

  async execute(id: string): Promise<SessionDay | null> {
    return this.sessionDayRepository.findByIdWithDetails(id);
  }
}
