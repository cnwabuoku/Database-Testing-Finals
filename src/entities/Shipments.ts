import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity
  } from 'typeorm';
  import { Trips } from './Trips';
  import { Customers } from '../entities/Customers'; // Assuming you have a `Customers` entity
  
  @Entity('shipments')
  export class Shipments extends BaseEntity {
    @PrimaryGeneratedColumn()
    shipment_id!: number;
  
    @ManyToOne(() => Customers)
    @JoinColumn({ name: 'customer_id' })
    customer!: Customers;
  
    @Column('int')
    weight!: number;
  
    @Column('int')
    value!: number;
  
    @Column('varchar', { length: 255 })
    origin!: string;
  
    @Column('varchar', { length: 255 })
    destination!: string;
  }