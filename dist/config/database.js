"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("./dotenv"));
const Customers_1 = require("../entities/Customers");
// import { Employees } from "../entities/Employees" ;
// import { Mechanics } from "../entities/Mechanics" ;
// import { Repairs } from "../entities/Repairs" ;
// import { Shipments } from "../entities/Shipments" ;
// import { Trips } from "../entities/Trips" ;
// import { Trucks } from "../entities/Trucks" ;
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: dotenv_1.default.DB_HOST,
    port: Number(dotenv_1.default.DB_PORT),
    username: dotenv_1.default.DB_USERNAME,
    password: dotenv_1.default.DB_PASSWORD,
    database: dotenv_1.default.DB_DATABASE,
    entities: [Customers_1.Customers], //Employees, Mechanics, Repairs, Shipments, Trips, Trucks],
    synchronize: true,
    logging: false
});
exports.default = AppDataSource;
//# sourceMappingURL=database.js.map