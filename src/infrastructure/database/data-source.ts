import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../../config/env';
import { Track } from '../../modules/tracks/domain/Track';
import { SessionDay } from '../../modules/session-days/domain/SessionDay';
import { TrackCondition } from '../../modules/track-conditions/domain/TrackCondition';
import { TireSet } from '../../modules/tire-sets/domain/TireSet';
import { KartSetup } from '../../modules/kart-setups/domain/KartSetup';
import { GearRatio } from '../../modules/gear-ratios/domain/GearRatio';
import { Stint } from '../../modules/stints/domain/Stint';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  entities: [Track, SessionDay, TrackCondition, TireSet, KartSetup, GearRatio, Stint],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  synchronize: false,
  logging: false
});
