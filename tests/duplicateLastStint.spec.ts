import { DuplicateLastStint } from '../src/modules/stints/use-cases/DuplicateLastStint';
import { StintRepository } from '../src/modules/stints/application/StintRepository';
import { Stint } from '../src/modules/stints/domain/Stint';

class InMemoryStintRepository implements StintRepository {
  private stints: Stint[] = [];

  async create(stint: Partial<Stint>): Promise<Stint> {
    const created = {
      id: `${Math.random()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      sessionDayId: stint.sessionDayId!,
      stintNumber: stint.stintNumber ?? 1,
      startTime: stint.startTime ?? null,
      durationMin: stint.durationMin ?? null,
      bestLapMs: stint.bestLapMs ?? null,
      avgLapMs: stint.avgLapMs ?? null,
      driverNotes: stint.driverNotes ?? null,
      tireSetId: stint.tireSetId ?? null,
      kartSetupId: stint.kartSetupId ?? null,
      gearRatioId: stint.gearRatioId ?? null,
      sessionDay: undefined as never,
      tireSet: null,
      kartSetup: null,
      gearRatio: null
    } as Stint;
    this.stints.push(created);
    return created;
  }

  async findById(id: string): Promise<Stint | null> {
    return this.stints.find((stint) => stint.id === id) ?? null;
  }

  async findLastBySessionDay(sessionDayId: string): Promise<Stint | null> {
    return (
      this.stints
        .filter((stint) => stint.sessionDayId === sessionDayId)
        .sort((a, b) => (b.stintNumber ?? 0) - (a.stintNumber ?? 0))[0] ?? null
    );
  }

  async findBySessionDay(sessionDayId: string): Promise<Stint[]> {
    return this.stints.filter((stint) => stint.sessionDayId === sessionDayId);
  }

  async update(id: string, data: Partial<Stint>): Promise<Stint | null> {
    const stint = await this.findById(id);
    if (!stint) {
      return null;
    }
    Object.assign(stint, data, { updatedAt: new Date() });
    return stint;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.stints.findIndex((stint) => stint.id === id);
    if (index === -1) {
      return false;
    }
    this.stints.splice(index, 1);
    return true;
  }
}

describe('DuplicateLastStint', () => {
  it('duplicates the last stint and applies overrides', async () => {
    const repository = new InMemoryStintRepository();
    await repository.create({
      sessionDayId: 'session-1',
      stintNumber: 1,
      tireSetId: 'tire-1',
      kartSetupId: 'setup-1',
      gearRatioId: 'gear-1',
      driverNotes: 'original'
    });

    const useCase = new DuplicateLastStint(repository);
    const duplicated = await useCase.execute({
      sessionDayId: 'session-1',
      overrides: {
        stintNumber: 2,
        driverNotes: 'duplicated'
      }
    });

    expect(duplicated.stintNumber).toBe(2);
    expect(duplicated.driverNotes).toBe('duplicated');
    expect(duplicated.tireSetId).toBe('tire-1');
    expect(duplicated.kartSetupId).toBe('setup-1');
    expect(duplicated.gearRatioId).toBe('gear-1');
  });
});
