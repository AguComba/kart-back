import { TireSetRepository } from '../application/TireSetRepository';

export class DeleteTireSet {
  constructor(private readonly tireSetRepository: TireSetRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.tireSetRepository.delete(id);
  }
}
