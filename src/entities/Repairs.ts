import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Trucks } from './Trucks';
import { Mechanics } from './Mechanics';

@Entity('repairs')
export class Repairs extends BaseEntity {
    @PrimaryGeneratedColumn()
    repair_id!: number;

    @ManyToOne(() => Trucks, (truck) => truck.repairs)
    @JoinColumn({ name: 'truck_id' })  // Foreign key column name should be truck_id
    truck!: Trucks;

    @ManyToOne(() => Mechanics, (mechanic) => mechanic.repairs)
    @JoinColumn({ name: 'mechanic_id' })  // Foreign key column name should be mechanic_id
    mechanic!: Mechanics;

    @Column('int')
    repair_time_days!: number;
}