import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { SessionDayRepositoryTypeOrm } from '../../infrastructure/typeorm/SessionDayRepositoryTypeOrm';
import { TrackConditionRepositoryTypeOrm } from '../../../track-conditions/infrastructure/typeorm/TrackConditionRepositoryTypeOrm';
import { StintRepositoryTypeOrm } from '../../../stints/infrastructure/typeorm/StintRepositoryTypeOrm';
import { CreateSessionDay } from '../../use-cases/CreateSessionDay';
import { ListSessionDays } from '../../use-cases/ListSessionDays';
import { GetSessionDay } from '../../use-cases/GetSessionDay';
import { UpdateSessionDay } from '../../use-cases/UpdateSessionDay';
import { DeleteSessionDay } from '../../use-cases/DeleteSessionDay';
import { CreateTrackCondition } from '../../../track-conditions/use-cases/CreateTrackCondition';
import { TrackGrip, TrackState } from '../../../track-conditions/domain/TrackConditionEnums';
import { CreateStint } from '../../../stints/use-cases/CreateStint';
import { ListStintsBySessionDay } from '../../../stints/use-cases/ListStintsBySessionDay';
import { DuplicateLastStint } from '../../../stints/use-cases/DuplicateLastStint';

const sessionDaySchema = z.object({
  date: z.string().min(1),
  trackId: z.string().uuid(),
  generalNotes: z.string().optional().nullable(),
  condition: z
    .object({
      trackState: z.nativeEnum(TrackState),
      grip: z.nativeEnum(TrackGrip),
      ambientTempC: z.number().optional().nullable(),
      trackTempC: z.number().optional().nullable(),
      notes: z.string().optional().nullable()
    })
    .optional()
});

const trackConditionSchema = z.object({
  trackState: z.nativeEnum(TrackState),
  grip: z.nativeEnum(TrackGrip),
  ambientTempC: z.number().optional().nullable(),
  trackTempC: z.number().optional().nullable(),
  notes: z.string().optional().nullable()
});

const stintSchema = z.object({
  stintNumber: z.number().int(),
  startTime: z.string().datetime().optional().nullable(),
  durationMin: z.number().int().optional().nullable(),
  bestLapMs: z.number().int().optional().nullable(),
  avgLapMs: z.number().int().optional().nullable(),
  driverNotes: z.string().optional().nullable(),
  tireSetId: z.string().uuid().optional().nullable(),
  kartSetupId: z.string().uuid().optional().nullable(),
  gearRatioId: z.string().uuid().optional().nullable()
});

export const sessionDayRoutes = async (app: FastifyInstance) => {
  const sessionDayRepository = new SessionDayRepositoryTypeOrm();
  const trackConditionRepository = new TrackConditionRepositoryTypeOrm();
  const stintRepository = new StintRepositoryTypeOrm();

  app.get('/', async () => {
    const sessionDays = await new ListSessionDays(sessionDayRepository).execute();
    return sessionDays.map((sessionDay) => ({
      ...sessionDay,
      lastCondition: sessionDay.conditions?.[0] ?? null,
      stintsCount: sessionDay.stints?.length ?? 0,
      conditions: undefined,
      stints: undefined
    }));
  });

  app.post('/', async (request, reply) => {
    const body = sessionDaySchema.parse(request.body);
    const created = await new CreateSessionDay(sessionDayRepository, trackConditionRepository).execute({
      sessionDay: {
        date: body.date,
        trackId: body.trackId,
        generalNotes: body.generalNotes
      },
      condition: body.condition
    });

    return reply.code(201).send(created);
  });

  app.get('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const sessionDay = await new GetSessionDay(sessionDayRepository).execute(id);
    if (!sessionDay) {
      return reply.code(404).send({ message: 'Session day not found' });
    }
    return sessionDay;
  });

  app.put('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = sessionDaySchema.partial().parse(request.body);
    const updated = await new UpdateSessionDay(sessionDayRepository).execute(id, body);
    if (!updated) {
      return reply.code(404).send({ message: 'Session day not found' });
    }
    return updated;
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const deleted = await new DeleteSessionDay(sessionDayRepository).execute(id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Session day not found' });
    }
    return reply.code(204).send();
  });

  app.post('/:id/conditions', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = trackConditionSchema.parse(request.body);
    const created = await new CreateTrackCondition(trackConditionRepository).execute({
      ...body,
      sessionDayId: id
    });
    return reply.code(201).send(created);
  });

  app.post('/:id/stints', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = stintSchema.parse(request.body);
    const created = await new CreateStint(stintRepository).execute({
      ...body,
      sessionDayId: id,
      startTime: body.startTime ? new Date(body.startTime) : null
    });
    return reply.code(201).send(created);
  });

  app.get('/:id/stints', async (request) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    return new ListStintsBySessionDay(stintRepository).execute(id);
  });

  app.post('/:id/stints/duplicate-last', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = stintSchema.partial().parse(request.body ?? {});
    const created = await new DuplicateLastStint(stintRepository).execute({
      sessionDayId: id,
      overrides: {
        ...body,
        startTime: body.startTime ? new Date(body.startTime) : undefined
      }
    });
    return reply.code(201).send(created);
  });
};
