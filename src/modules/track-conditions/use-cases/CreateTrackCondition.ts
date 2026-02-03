import { TrackConditionRepository } from '../application/TrackConditionRepository';
import { TrackCondition } from '../domain/TrackCondition';

export class CreateTrackCondition {
  constructor(private readonly trackConditionRepository: TrackConditionRepository) {}

  async execute(data: Partial<TrackCondition>): Promise<TrackCondition> {
    return this.trackConditionRepository.create(data);
  }
}
