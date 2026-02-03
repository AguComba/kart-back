import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { trackRoutes } from './modules/tracks/interfaces/http/trackRoutes';
import { tireSetRoutes } from './modules/tire-sets/interfaces/http/tireSetRoutes';
import { kartSetupRoutes } from './modules/kart-setups/interfaces/http/kartSetupRoutes';
import { sessionDayRoutes } from './modules/session-days/interfaces/http/sessionDayRoutes';
import { stintRoutes } from './modules/stints/interfaces/http/stintRoutes';

export const buildApp = () => {
  const app = fastify({ logger: true });

  app.register(swagger, {
    swagger: {
      info: {
        title: 'Karting Session Logbook API',
        version: '0.1.0'
      }
    }
  });

  app.register(swaggerUi, {
    routePrefix: '/docs'
  });

  app.register(trackRoutes, { prefix: '/tracks' });
  app.register(tireSetRoutes, { prefix: '/tiresets' });
  app.register(kartSetupRoutes, { prefix: '/setups' });
  app.register(sessionDayRoutes, { prefix: '/session-days' });
  app.register(stintRoutes, { prefix: '/stints' });

  return app;
};
