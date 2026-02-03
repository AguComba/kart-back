import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Stint } from '../../stints/domain/Stint';
import { TireStatus } from './TireSetEnums';

@Entity('tire_sets')
export class TireSet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  brand!: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  model?: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  compound?: string | null;

  @Column({ type: 'enum', enum: TireStatus })
  status!: TireStatus;

  @Column({ type: 'int', nullable: true })
  heatCycles?: number | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @OneToMany(() => Stint, (stint) => stint.tireSet)
  stints!: Stint[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
