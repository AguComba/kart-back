import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TrackRepositoryTypeOrm } from '../../infrastructure/typeorm/TrackRepositoryTypeOrm';
import { CreateTrack } from '../../use-cases/CreateTrack';
import { ListTracks } from '../../use-cases/ListTracks';
import { GetTrack } from '../../use-cases/GetTrack';
import { UpdateTrack } from '../../use-cases/UpdateTrack';
import { DeleteTrack } from '../../use-cases/DeleteTrack';

const trackSchema = z.object({
  name: z.string().min(1),
  layout: z.string().optional().nullable(),
  location: z.string().optional().nullable()
});

export const trackRoutes = async (app: FastifyInstance) => {
  const repository = new TrackRepositoryTypeOrm();

  app.get('/', async () => {
    return new ListTracks(repository).execute();
  });

  app.post('/', async (request, reply) => {
    const body = trackSchema.parse(request.body);
    const created = await new CreateTrack(repository).execute(body);
    return reply.code(201).send(created);
  });

  app.get('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const track = await new GetTrack(repository).execute(id);
    if (!track) {
      return reply.code(404).send({ message: 'Track not found' });
    }
    return track;
  });

  app.put('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const body = trackSchema.partial().parse(request.body);
    const updated = await new UpdateTrack(repository).execute(id, body);
    if (!updated) {
      return reply.code(404).send({ message: 'Track not found' });
    }
    return updated;
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string().uuid() }).parse(request.params);
    const deleted = await new DeleteTrack(repository).execute(id);
    if (!deleted) {
      return reply.code(404).send({ message: 'Track not found' });
    }
    return reply.code(204).send();
  });
};
