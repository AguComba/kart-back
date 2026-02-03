import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SessionDay } from '../../session-days/domain/SessionDay';
import { TrackGrip, TrackState } from './TrackConditionEnums';

@Entity('track_conditions')
export class TrackCondition {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  sessionDayId!: string;

  @ManyToOne(() => SessionDay, (sessionDay) => sessionDay.conditions, { onDelete: 'CASCADE' })
  sessionDay!: SessionDay;

  @Column({ type: 'enum', enum: TrackState })
  trackState!: TrackState;

  @Column({ type: 'enum', enum: TrackGrip })
  grip!: TrackGrip;

  @Column({ type: 'numeric', nullable: true })
  ambientTempC?: number | null;

  @Column({ type: 'numeric', nullable: true })
  trackTempC?: number | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
