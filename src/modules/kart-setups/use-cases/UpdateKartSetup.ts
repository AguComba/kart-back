import { KartSetupRepository } from '../application/KartSetupRepository';
import { KartSetup } from '../domain/KartSetup';

export class UpdateKartSetup {
  constructor(private readonly kartSetupRepository: KartSetupRepository) {}

  async execute(id: string, data: Partial<KartSetup>): Promise<KartSetup | null> {
    return this.kartSetupRepository.update(id, data);
  }
}
