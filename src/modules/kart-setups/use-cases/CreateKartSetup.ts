import { KartSetupRepository } from '../application/KartSetupRepository';
import { KartSetup } from '../domain/KartSetup';

export class CreateKartSetup {
  constructor(private readonly kartSetupRepository: KartSetupRepository) {}

  async execute(data: Partial<KartSetup>): Promise<KartSetup> {
    return this.kartSetupRepository.create(data);
  }
}
