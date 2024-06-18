import { DataSource } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();
const mssqlConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['database/entities/*.js'],
  synchronize: false,
  options: {
    trustServerCertificate: true,
  },
};

const connectionSource = new DataSource(mssqlConfig);
await connectionSource.initialize();

export default connectionSource;
