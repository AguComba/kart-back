import { TireSetRepository } from '../application/TireSetRepository';
import { TireSet } from '../domain/TireSet';

export class ListTireSets {
  constructor(private readonly tireSetRepository: TireSetRepository) {}

  async execute(): Promise<TireSet[]> {
    return this.tireSetRepository.findAll();
  }
}
