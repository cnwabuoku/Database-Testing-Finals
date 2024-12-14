import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity
  } from 'typeorm';
  import { Trucks } from './Trucks'; // Assuming you have a `Trucks` entity
  import { Employees } from './Employees'; // Assuming you have an `Employees` entity
  import { Shipments } from './Shipments'; // Assuming you have a `Shipments` entity
  
  @Entity('trips')
  export class Trips extends BaseEntity {
    @PrimaryGeneratedColumn()
    trip_id!: number;
  
    @ManyToOne(() => Trucks)
    @JoinColumn({ name: 'truck_id' })
    truck!: Trucks;
  
    @ManyToOne(() => Employees)
    @JoinColumn({ name: 'driver1_id' })
    driver1!: Employees;
  
    @ManyToOne(() => Employees)
    @JoinColumn({ name: 'driver2_id' })
    driver2!: Employees;
  
    @ManyToOne(() => Shipments)
    @JoinColumn({ name: 'shipment_id' })
    shipment!: Shipments;
  }