import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Repairs } from './Repairs';
import { Trips } from './Trips';

@Entity('trucks')
export class Trucks extends BaseEntity {
    @PrimaryGeneratedColumn()
    truck_id!: number;

    @Column('varchar', { length: 255 })
    brand!: string;

    @Column('int')
    load!: number;

    @Column('int')
    year!: number;

    @Column('int')
    capacity!: number;

    @Column('int')
    number_of_repairs!: number;

    @OneToMany(() => Repairs, (repair) => repair.truck)
    repairs!: Repairs[];

    @OneToMany(() => Trips, trip => trip.truck)
    trips!: Trips[];
}
