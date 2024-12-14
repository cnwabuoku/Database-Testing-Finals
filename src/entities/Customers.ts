import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    customer_id!: number;

    @Column({ length: 100 })
    name!: string;
    
    @Column({ length: 255 })
    address!: string;

    @Column({ length: 15, nullable: true })
    phone1!: string;

    @Column({ length: 15, nullable: true })
    phone2!: string;
}
