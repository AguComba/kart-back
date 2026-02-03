import { KartSetupRepository } from '../application/KartSetupRepository';
import { KartSetup } from '../domain/KartSetup';

export class ListKartSetups {
  constructor(private readonly kartSetupRepository: KartSetupRepository) {}

  async execute(): Promise<KartSetup[]> {
    return this.kartSetupRepository.findAll();
  }
}
