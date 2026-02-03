import { StintRepository } from '../application/StintRepository';
import { Stint } from '../domain/Stint';

export class UpdateStint {
  constructor(private readonly stintRepository: StintRepository) {}

  async execute(id: string, data: Partial<Stint>): Promise<Stint | null> {
    return this.stintRepository.update(id, data);
  }
}
