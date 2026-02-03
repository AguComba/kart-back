import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Stint } from '../../stints/domain/Stint';

@Entity('gear_ratios')
export class GearRatio {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int' })
  sprocket!: number;

  @Column({ type: 'int' })
  pinion!: number;

  @Column({ type: 'numeric', nullable: true })
  finalRatio?: number | null;

  @OneToMany(() => Stint, (stint) => stint.gearRatio)
  stints!: Stint[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
