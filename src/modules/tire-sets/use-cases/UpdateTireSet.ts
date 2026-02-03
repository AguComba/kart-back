import { TireSetRepository } from '../application/TireSetRepository';
import { TireSet } from '../domain/TireSet';

export class UpdateTireSet {
  constructor(private readonly tireSetRepository: TireSetRepository) {}

  async execute(id: string, data: Partial<TireSet>): Promise<TireSet | null> {
    return this.tireSetRepository.update(id, data);
  }
}
