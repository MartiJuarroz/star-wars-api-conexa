import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";
import { CreateTables1727797301846 } from "src/migrations/1727797301846-create-tables";
import { InsertData1727797304664 } from "src/migrations/1727797304664-insert-data";

const dest= `${__dirname}/../../`;

const filePath: string = resolve(`${dest}/local.env`);
if (!existsSync(filePath)) {
  console.log(`No se encuentra: ${filePath}`);
}

dotenv.config({ path: filePath })

export const Config:DataSourceOptions={
    type: 'mssql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,      
    options: {
      encrypt: false, 
      trustServerCertificate: true 
    },
    migrationsRun: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [CreateTables1727797301846, InsertData1727797304664],
    migrationsTableName: 'migrations',
}
export const AppDataSource: DataSource = new DataSource(Config);

AppDataSource.initialize();