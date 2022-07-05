import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "stoktakip",
    "entities": [
        __dirname + "/api/entities/*.entity.ts"
    ],
    synchronize: true,
    logging: false
})