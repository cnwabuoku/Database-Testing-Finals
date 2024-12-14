import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
  } from 'typeorm';
  
  @Entity('employees')
  export class Employees {
    @PrimaryGeneratedColumn()
    employee_id!: number;
  
    @Column('varchar', { length: 255 })
    name!: string;

    @Column('varchar', { length: 255 })
    surname!: string;
  
    @Column('int')
    seniority!: number;
  
    @Column('varchar', { length: 255 })
    category!: string;
  
    @Column('varchar', { length: 255 })
    specialized_brand!: string;
  }