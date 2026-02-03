import { buildApp } from './app';
import { env } from './config/env';
import { AppDataSource } from './infrastructure/database/data-source';

const start = async () => {
  try {
    await AppDataSource.initialize();
    const app = buildApp();
    await app.listen({ port: env.port, host: '0.0.0.0' });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
