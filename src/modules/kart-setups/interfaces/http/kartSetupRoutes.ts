import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AxleHardness, RideHeight, SeatPosition } from '../../domain/KartSetupEnums';
import { KartSetupRepositoryTypeOrm } from '../../infrastructure/typeorm/KartSetupRepositoryTypeOrm';
import { CreateKartSetup } from '../../use-cases/CreateKartSetup';
import { ListKartSetups } from '../../use-cases/ListKartSetups';
import { GetKartSetup } from '../../use-cases/GetKartSetup';
import { UpdateKartSetup } from '../../use-cases/UpdateKartSetup';
import { DeleteKartSetup } from '../../use-cases/DeleteKartSetup';

const setupSchema = z.object({
  name: z.string().min(1),
  rearAxle: z.nativeEnum(AxleHardness).optional().nullable(),
  frontRideHeight: z.nativeEnum(RideHeight).optional().nullable(),
  rearRideHeight: z.nativeEnum(RideHeight).optional().nullable(),
  seatPosition: z.nativeEnum(SeatPosition).optional().nullable(),
  notes: z.string().optional().nullable()
});

export const kartSetupRoutes = async (app: FastifyInstance) => {
  const repository = new KartSetupRepositoryTypeOrm();

  app.get('/', async () => {
    return new ListKartSetups(repository).execute();
  });

  app.post('/', async (request, reply) => {
    const body = setupSchema.parse(request.body);
    const created = await new CreateKartSetup(repository).execute(body);
    return reply.code(201).send(created);
  });

  app.get('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const setup = await new GetKartSetup(repository).execute(id);
    if (!setup) {
      return reply.code(404).send({ message: 'Kart setup not found' });
    }
    return setup;
  });

  app.put('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = setupSchema.partial().parse(request.body);
    const updated = await new UpdateKartSetup(repository).execute(id, body);
    if (!updated) {
      return reply.code(404).send({ message: 'Kart setup not found' });
    }
    return updated;
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const deleted = await new DeleteKartSetup(repository).execute(id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Kart setup not found' });
    }
    return reply.code(204).send();
  });
};
