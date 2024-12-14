import { DataSource } from "typeorm" ;
import dotenv from "./dotenv" ;
import { Customers } from "../entities/Customers" ;
import { Employees } from "../entities/Employees" ;
import { Mechanics } from "../entities/Mechanics" ;
import { Repairs } from "../entities/Repairs" ;
import { Shipments } from "../entities/Shipments" ;
import { Trips } from "../entities/Trips" ;
import { Trucks } from "../entities/Trucks" ;

const AppDataSource = new DataSource({
    type: "postgres",
    host: dotenv.DB_HOST,
    port: Number(dotenv.DB_PORT),
    username: dotenv.DB_USERNAME,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Customers, Trucks, Employees, Mechanics, Repairs, Shipments, Trips],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;