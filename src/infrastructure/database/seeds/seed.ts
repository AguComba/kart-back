import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Track } from '../../../modules/tracks/domain/Track';
import { SessionDay } from '../../../modules/session-days/domain/SessionDay';
import { TrackCondition } from '../../../modules/track-conditions/domain/TrackCondition';
import { TrackGrip, TrackState } from '../../../modules/track-conditions/domain/TrackConditionEnums';
import { TireSet } from '../../../modules/tire-sets/domain/TireSet';
import { TireStatus } from '../../../modules/tire-sets/domain/TireSetEnums';
import { KartSetup } from '../../../modules/kart-setups/domain/KartSetup';
import { AxleHardness, RideHeight, SeatPosition } from '../../../modules/kart-setups/domain/KartSetupEnums';
import { GearRatio } from '../../../modules/gear-ratios/domain/GearRatio';
import { Stint } from '../../../modules/stints/domain/Stint';

const seed = async () => {
  await AppDataSource.initialize();

  const trackRepo = AppDataSource.getRepository(Track);
  const sessionDayRepo = AppDataSource.getRepository(SessionDay);
  const conditionRepo = AppDataSource.getRepository(TrackCondition);
  const tireRepo = AppDataSource.getRepository(TireSet);
  const setupRepo = AppDataSource.getRepository(KartSetup);
  const gearRepo = AppDataSource.getRepository(GearRatio);
  const stintRepo = AppDataSource.getRepository(Stint);

  const track = await trackRepo.save(
    trackRepo.create({
      name: 'Buenos Aires Kartodromo',
      layout: 'Circuito A',
      location: 'Argentina'
    })
  );

  const sessionDay = await sessionDayRepo.save(
    sessionDayRepo.create({
      date: new Date().toISOString().slice(0, 10),
      trackId: track.id,
      generalNotes: 'Primer día de pruebas.'
    })
  );

  await conditionRepo.save(
    conditionRepo.create({
      sessionDayId: sessionDay.id,
      trackState: TrackState.DRY,
      grip: TrackGrip.MEDIUM,
      ambientTempC: 22,
      trackTempC: 28,
      notes: 'Pista limpia.'
    })
  );

  const tireSet = await tireRepo.save(
    tireRepo.create({
      brand: 'MG',
      model: 'Yellow',
      compound: 'Medium',
      status: TireStatus.NEW,
      heatCycles: 0
    })
  );

  const setup = await setupRepo.save(
    setupRepo.create({
      name: 'Setup base',
      rearAxle: AxleHardness.MEDIUM,
      frontRideHeight: RideHeight.MEDIUM,
      rearRideHeight: RideHeight.LOW,
      seatPosition: SeatPosition.MIDDLE
    })
  );

  const gearRatio = await gearRepo.save(
    gearRepo.create({
      sprocket: 80,
      pinion: 12,
      finalRatio: 6.67
    })
  );

  await stintRepo.save(
    stintRepo.create({
      sessionDayId: sessionDay.id,
      stintNumber: 1,
      durationMin: 10,
      bestLapMs: 64500,
      avgLapMs: 66000,
      tireSetId: tireSet.id,
      kartSetupId: setup.id,
      gearRatioId: gearRatio.id,
      driverNotes: 'Buen ritmo inicial.'
    })
  );

  await stintRepo.save(
    stintRepo.create({
      sessionDayId: sessionDay.id,
      stintNumber: 2,
      durationMin: 12,
      bestLapMs: 64000,
      avgLapMs: 65500,
      tireSetId: tireSet.id,
      kartSetupId: setup.id,
      gearRatioId: gearRatio.id,
      driverNotes: 'Mejorando el paso por curva.'
    })
  );

  await AppDataSource.destroy();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
