import { SessionDayRepository } from '../application/SessionDayRepository';

export class DeleteSessionDay {
  constructor(private readonly sessionDayRepository: SessionDayRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.sessionDayRepository.delete(id);
  }
}
