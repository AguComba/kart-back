import { TireSetRepository } from '../application/TireSetRepository';
import { TireSet } from '../domain/TireSet';

export class CreateTireSet {
  constructor(private readonly tireSetRepository: TireSetRepository) {}

  async execute(data: Partial<TireSet>): Promise<TireSet> {
    return this.tireSetRepository.create(data);
  }
}
