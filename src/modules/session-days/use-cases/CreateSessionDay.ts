import { SessionDayRepository } from '../application/SessionDayRepository';
import { TrackConditionRepository } from '../../track-conditions/application/TrackConditionRepository';
import { SessionDay } from '../domain/SessionDay';
import { TrackCondition } from '../../track-conditions/domain/TrackCondition';

interface CreateSessionDayInput {
  sessionDay: Partial<SessionDay>;
  condition?: Partial<TrackCondition>;
}

export class CreateSessionDay {
  constructor(
    private readonly sessionDayRepository: SessionDayRepository,
    private readonly trackConditionRepository: TrackConditionRepository
  ) {}

  async execute(input: CreateSessionDayInput): Promise<SessionDay> {
    const created = await this.sessionDayRepository.create(input.sessionDay);
    if (input.condition) {
      await this.trackConditionRepository.create({
        ...input.condition,
        sessionDayId: created.id
      });
    }
    return created;
  }
}
