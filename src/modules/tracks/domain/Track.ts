import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SessionDay } from '../../session-days/domain/SessionDay';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  layout?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  location?: string | null;

  @OneToMany(() => SessionDay, (sessionDay) => sessionDay.track)
  sessionDays!: SessionDay[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
