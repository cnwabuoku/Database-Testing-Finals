import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    BaseEntity
  } from 'typeorm';
  import { Employees } from './Employees';
  import { Repairs } from './Repairs';

  @Entity('mechanics')
  export class Mechanics {
    @PrimaryGeneratedColumn()
    mechanic_id!: number;

    @ManyToOne(() => Employees, (employee) => employee.employee_id)
    @JoinColumn({ name: 'employee_id' }) // Join column references the Employee table
    employee!: Employees;
  
    @Column('varchar', { length: 255 })
    specialized_brand!: string;

    @OneToMany(() => Repairs, (repair) => repair.mechanic)
    repairs!: Repairs[];
  }