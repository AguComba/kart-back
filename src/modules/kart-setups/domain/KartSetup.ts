import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Stint } from '../../stints/domain/Stint';
import { AxleHardness, RideHeight, SeatPosition } from './KartSetupEnums';

@Entity('kart_setups')
export class KartSetup {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ type: 'enum', enum: AxleHardness, nullable: true })
  rearAxle?: AxleHardness | null;

  @Column({ type: 'enum', enum: RideHeight, nullable: true })
  frontRideHeight?: RideHeight | null;

  @Column({ type: 'enum', enum: RideHeight, nullable: true })
  rearRideHeight?: RideHeight | null;

  @Column({ type: 'enum', enum: SeatPosition, nullable: true })
  seatPosition?: SeatPosition | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @OneToMany(() => Stint, (stint) => stint.kartSetup)
  stints!: Stint[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
