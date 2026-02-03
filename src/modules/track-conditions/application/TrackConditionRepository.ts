import { TrackCondition } from '../domain/TrackCondition';

export interface TrackConditionRepository {
  create(condition: Partial<TrackCondition>): Promise<TrackCondition>;
  findLatestBySessionDay(sessionDayId: string): Promise<TrackCondition | null>;
}
