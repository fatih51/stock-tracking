import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

import  Product  from './api/routes/product.route';

app.use("/",Product)

createConnection({
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
  }).then(async connection => {
      console.log("Connected to database");
  }).catch(error => console.log(error));

app.listen(PORT, () => {
    console.log('listening on port 3000');
});
