import { KartSetup } from '../domain/KartSetup';

export interface KartSetupRepository {
  create(setup: Partial<KartSetup>): Promise<KartSetup>;
  findAll(): Promise<KartSetup[]>;
  findById(id: string): Promise<KartSetup | null>;
  update(id: string, data: Partial<KartSetup>): Promise<KartSetup | null>;
  delete(id: string): Promise<boolean>;
}
