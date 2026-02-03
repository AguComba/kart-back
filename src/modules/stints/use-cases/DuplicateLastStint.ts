import { StintRepository } from '../application/StintRepository';
import { Stint } from '../domain/Stint';

interface DuplicateLastStintInput {
  sessionDayId: string;
  overrides?: Partial<Stint>;
}

export class DuplicateLastStint {
  constructor(private readonly stintRepository: StintRepository) {}

  async execute({ sessionDayId, overrides }: DuplicateLastStintInput): Promise<Stint> {
    const last = await this.stintRepository.findLastBySessionDay(sessionDayId);
    if (!last) {
      throw new Error('No stints found for session day');
    }

    const { id, createdAt, updatedAt, ...copy } = last;

    return this.stintRepository.create({
      ...copy,
      sessionDayId,
      ...overrides
    });
  }
}
