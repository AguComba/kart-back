import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Track } from '../../tracks/domain/Track';
import { TrackCondition } from '../../track-conditions/domain/TrackCondition';
import { Stint } from '../../stints/domain/Stint';

@Entity('session_days')
export class SessionDay {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  date!: string;

  @ManyToOne(() => Track, (track) => track.sessionDays, { onDelete: 'RESTRICT' })
  track!: Track;

  @Column({ type: 'uuid' })
  trackId!: string;

  @Column({ type: 'text', nullable: true })
  generalNotes?: string | null;

  @OneToMany(() => TrackCondition, (condition) => condition.sessionDay)
  conditions!: TrackCondition[];

  @OneToMany(() => Stint, (stint) => stint.sessionDay)
  stints!: Stint[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
