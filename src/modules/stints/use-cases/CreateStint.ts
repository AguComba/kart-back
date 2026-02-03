import { StintRepository } from '../application/StintRepository';
import { Stint } from '../domain/Stint';

export class CreateStint {
  constructor(private readonly stintRepository: StintRepository) {}

  async execute(data: Partial<Stint>): Promise<Stint> {
    return this.stintRepository.create(data);
  }
}
