import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1700000000000 implements MigrationInterface {
  name = 'InitSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"');
    await queryRunner.query("CREATE TYPE \"track_conditions_track_state_enum\" AS ENUM ('DRY', 'DAMP', 'WET')");
    await queryRunner.query("CREATE TYPE \"track_conditions_grip_enum\" AS ENUM ('LOW', 'MEDIUM', 'HIGH')");
    await queryRunner.query("CREATE TYPE \"tire_sets_status_enum\" AS ENUM ('NEW', 'USED')");
    await queryRunner.query("CREATE TYPE \"kart_setups_rear_axle_enum\" AS ENUM ('SOFT', 'MEDIUM', 'HARD')");
    await queryRunner.query("CREATE TYPE \"kart_setups_front_ride_height_enum\" AS ENUM ('LOW', 'MEDIUM', 'HIGH')");
    await queryRunner.query("CREATE TYPE \"kart_setups_rear_ride_height_enum\" AS ENUM ('LOW', 'MEDIUM', 'HIGH')");
    await queryRunner.query("CREATE TYPE \"kart_setups_seat_position_enum\" AS ENUM ('FRONT', 'MIDDLE', 'REAR')");

    await queryRunner.query(`
      CREATE TABLE "tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(120) NOT NULL,
        "layout" character varying(120),
        "location" character varying(120),
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_tracks_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "session_days" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "date" date NOT NULL,
        "trackId" uuid NOT NULL,
        "generalNotes" text,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_session_days_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "track_conditions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sessionDayId" uuid NOT NULL,
        "trackState" "track_conditions_track_state_enum" NOT NULL,
        "grip" "track_conditions_grip_enum" NOT NULL,
        "ambientTempC" numeric,
        "trackTempC" numeric,
        "notes" text,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_track_conditions_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "tire_sets" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "brand" character varying(120) NOT NULL,
        "model" character varying(120),
        "compound" character varying(120),
        "status" "tire_sets_status_enum" NOT NULL,
        "heatCycles" integer,
        "notes" text,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_tire_sets_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "kart_setups" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(120) NOT NULL,
        "rearAxle" "kart_setups_rear_axle_enum",
        "frontRideHeight" "kart_setups_front_ride_height_enum",
        "rearRideHeight" "kart_setups_rear_ride_height_enum",
        "seatPosition" "kart_setups_seat_position_enum",
        "notes" text,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_kart_setups_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "gear_ratios" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sprocket" integer NOT NULL,
        "pinion" integer NOT NULL,
        "finalRatio" numeric,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_gear_ratios_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "stints" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sessionDayId" uuid NOT NULL,
        "stintNumber" integer NOT NULL,
        "startTime" TIMESTAMPTZ,
        "durationMin" integer,
        "bestLapMs" integer,
        "avgLapMs" integer,
        "driverNotes" text,
        "tireSetId" uuid,
        "kartSetupId" uuid,
        "gearRatioId" uuid,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_stints_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(
      'ALTER TABLE "session_days" ADD CONSTRAINT "FK_session_days_track" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE RESTRICT ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "track_conditions" ADD CONSTRAINT "FK_track_conditions_session" FOREIGN KEY ("sessionDayId") REFERENCES "session_days"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "stints" ADD CONSTRAINT "FK_stints_session" FOREIGN KEY ("sessionDayId") REFERENCES "session_days"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "stints" ADD CONSTRAINT "FK_stints_tire" FOREIGN KEY ("tireSetId") REFERENCES "tire_sets"("id") ON DELETE SET NULL ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "stints" ADD CONSTRAINT "FK_stints_setup" FOREIGN KEY ("kartSetupId") REFERENCES "kart_setups"("id") ON DELETE SET NULL ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "stints" ADD CONSTRAINT "FK_stints_gear" FOREIGN KEY ("gearRatioId") REFERENCES "gear_ratios"("id") ON DELETE SET NULL ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "stints" DROP CONSTRAINT "FK_stints_gear"');
    await queryRunner.query('ALTER TABLE "stints" DROP CONSTRAINT "FK_stints_setup"');
    await queryRunner.query('ALTER TABLE "stints" DROP CONSTRAINT "FK_stints_tire"');
    await queryRunner.query('ALTER TABLE "stints" DROP CONSTRAINT "FK_stints_session"');
    await queryRunner.query('ALTER TABLE "track_conditions" DROP CONSTRAINT "FK_track_conditions_session"');
    await queryRunner.query('ALTER TABLE "session_days" DROP CONSTRAINT "FK_session_days_track"');

    await queryRunner.query('DROP TABLE "stints"');
    await queryRunner.query('DROP TABLE "gear_ratios"');
    await queryRunner.query('DROP TABLE "kart_setups"');
    await queryRunner.query('DROP TABLE "tire_sets"');
    await queryRunner.query('DROP TABLE "track_conditions"');
    await queryRunner.query('DROP TABLE "session_days"');
    await queryRunner.query('DROP TABLE "tracks"');

    await queryRunner.query('DROP TYPE "kart_setups_seat_position_enum"');
    await queryRunner.query('DROP TYPE "kart_setups_rear_ride_height_enum"');
    await queryRunner.query('DROP TYPE "kart_setups_front_ride_height_enum"');
    await queryRunner.query('DROP TYPE "kart_setups_rear_axle_enum"');
    await queryRunner.query('DROP TYPE "tire_sets_status_enum"');
    await queryRunner.query('DROP TYPE "track_conditions_grip_enum"');
    await queryRunner.query('DROP TYPE "track_conditions_track_state_enum"');
  }
}
