import { StintRepository } from '../application/StintRepository';

export class DeleteStint {
  constructor(private readonly stintRepository: StintRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.stintRepository.delete(id);
  }
}
