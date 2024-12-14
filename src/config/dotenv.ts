import dotenv from 'dotenv';

dotenv.config();

export default {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_DATABASE: process.env.DB_DATABASE || 'RoadFreightTransportCompany',
    PORT: process.env.PORT || 3000,
};
