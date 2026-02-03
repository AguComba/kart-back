import { StintRepository } from '../application/StintRepository';
import { Stint } from '../domain/Stint';

export class ListStintsBySessionDay {
  constructor(private readonly stintRepository: StintRepository) {}

  async execute(sessionDayId: string): Promise<Stint[]> {
    return this.stintRepository.findBySessionDay(sessionDayId);
  }
}
