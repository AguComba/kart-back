import { SessionDayRepository } from '../application/SessionDayRepository';
import { SessionDay } from '../domain/SessionDay';

export class UpdateSessionDay {
  constructor(private readonly sessionDayRepository: SessionDayRepository) {}

  async execute(id: string, data: Partial<SessionDay>): Promise<SessionDay | null> {
    return this.sessionDayRepository.update(id, data);
  }
}
