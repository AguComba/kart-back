import { KartSetupRepository } from '../application/KartSetupRepository';
import { KartSetup } from '../domain/KartSetup';

export class GetKartSetup {
  constructor(private readonly kartSetupRepository: KartSetupRepository) {}

  async execute(id: string): Promise<KartSetup | null> {
    return this.kartSetupRepository.findById(id);
  }
}
