import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { StintRepositoryTypeOrm } from '../../infrastructure/typeorm/StintRepositoryTypeOrm';
import { UpdateStint } from '../../use-cases/UpdateStint';
import { DeleteStint } from '../../use-cases/DeleteStint';

const stintUpdateSchema = z.object({
  stintNumber: z.number().int().optional(),
  startTime: z.string().datetime().optional().nullable(),
  durationMin: z.number().int().optional().nullable(),
  bestLapMs: z.number().int().optional().nullable(),
  avgLapMs: z.number().int().optional().nullable(),
  driverNotes: z.string().optional().nullable(),
  tireSetId: z.string().uuid().optional().nullable(),
  kartSetupId: z.string().uuid().optional().nullable(),
  gearRatioId: z.string().uuid().optional().nullable()
});

export const stintRoutes = async (app: FastifyInstance) => {
  const repository = new StintRepositoryTypeOrm();

  app.put('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = stintUpdateSchema.parse(request.body);
    const updated = await new UpdateStint(repository).execute(id, {
      ...body,
      startTime: body.startTime ? new Date(body.startTime) : undefined
    });
    if (!updated) {
      return reply.code(404).send({ message: 'Stint not found' });
    }
    return updated;
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const deleted = await new DeleteStint(repository).execute(id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Stint not found' });
    }
    return reply.code(204).send();
  });
};
