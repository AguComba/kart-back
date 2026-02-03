import { TireSetRepository } from '../application/TireSetRepository';
import { TireSet } from '../domain/TireSet';

export class GetTireSet {
  constructor(private readonly tireSetRepository: TireSetRepository) {}

  async execute(id: string): Promise<TireSet | null> {
    return this.tireSetRepository.findById(id);
  }
}
