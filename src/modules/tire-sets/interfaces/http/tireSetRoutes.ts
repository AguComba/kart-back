import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TireStatus } from '../../domain/TireSetEnums';
import { TireSetRepositoryTypeOrm } from '../../infrastructure/typeorm/TireSetRepositoryTypeOrm';
import { CreateTireSet } from '../../use-cases/CreateTireSet';
import { ListTireSets } from '../../use-cases/ListTireSets';
import { UpdateTireSet } from '../../use-cases/UpdateTireSet';
import { DeleteTireSet } from '../../use-cases/DeleteTireSet';
import { GetTireSet } from '../../use-cases/GetTireSet';

const tireSetSchema = z.object({
  brand: z.string().min(1),
  model: z.string().optional().nullable(),
  compound: z.string().optional().nullable(),
  status: z.nativeEnum(TireStatus),
  heatCycles: z.number().int().optional().nullable(),
  notes: z.string().optional().nullable()
});

export const tireSetRoutes = async (app: FastifyInstance) => {
  const repository = new TireSetRepositoryTypeOrm();

  app.get('/', async () => {
    return new ListTireSets(repository).execute();
  });

  app.post('/', async (request, reply) => {
    const body = tireSetSchema.parse(request.body);
    const created = await new CreateTireSet(repository).execute(body);
    return reply.code(201).send(created);
  });

  app.get('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const tireSet = await new GetTireSet(repository).execute(id);
    if (!tireSet) {
      return reply.code(404).send({ message: 'Tire set not found' });
    }
    return tireSet;
  });

  app.put('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = tireSetSchema.partial().parse(request.body);
    const updated = await new UpdateTireSet(repository).execute(id, body);
    if (!updated) {
      return reply.code(404).send({ message: 'Tire set not found' });
    }
    return updated;
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const deleted = await new DeleteTireSet(repository).execute(id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Tire set not found' });
    }
    return reply.code(204).send();
  });
};
