import { KartSetupRepository } from '../application/KartSetupRepository';

export class DeleteKartSetup {
  constructor(private readonly kartSetupRepository: KartSetupRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.kartSetupRepository.delete(id);
  }
}
