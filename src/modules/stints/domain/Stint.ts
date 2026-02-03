import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SessionDay } from '../../session-days/domain/SessionDay';
import { TireSet } from '../../tire-sets/domain/TireSet';
import { KartSetup } from '../../kart-setups/domain/KartSetup';
import { GearRatio } from '../../gear-ratios/domain/GearRatio';

@Entity('stints')
export class Stint {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  sessionDayId!: string;

  @ManyToOne(() => SessionDay, (sessionDay) => sessionDay.stints, { onDelete: 'CASCADE' })
  sessionDay!: SessionDay;

  @Column({ type: 'int' })
  stintNumber!: number;

  @Column({ type: 'timestamptz', nullable: true })
  startTime?: Date | null;

  @Column({ type: 'int', nullable: true })
  durationMin?: number | null;

  @Column({ type: 'int', nullable: true })
  bestLapMs?: number | null;

  @Column({ type: 'int', nullable: true })
  avgLapMs?: number | null;

  @Column({ type: 'text', nullable: true })
  driverNotes?: string | null;

  @Column({ type: 'uuid', nullable: true })
  tireSetId?: string | null;

  @ManyToOne(() => TireSet, (tireSet) => tireSet.stints, { nullable: true, onDelete: 'SET NULL' })
  tireSet?: TireSet | null;

  @Column({ type: 'uuid', nullable: true })
  kartSetupId?: string | null;

  @ManyToOne(() => KartSetup, (kartSetup) => kartSetup.stints, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  kartSetup?: KartSetup | null;

  @Column({ type: 'uuid', nullable: true })
  gearRatioId?: string | null;

  @ManyToOne(() => GearRatio, (gearRatio) => gearRatio.stints, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  gearRatio?: GearRatio | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
