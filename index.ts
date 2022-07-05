import 'reflect-metadata';
import express from 'express';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

import  Product  from './api/routes/product.route';
import User from './api/routes/user.route';
import Stock from './api/routes/stock.route';
import { dataSource } from './data-source';

app.use("/",Product)
app.use("/",User)
app.use("/",Stock)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataSource.initialize().then(() => {
        console.log("Database connected");
    }).catch(err => {
        console.log(err);
    })
});
