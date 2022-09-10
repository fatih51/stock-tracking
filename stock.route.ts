import express from "express";
import { dataSource } from "../../data-source";
import { Stock } from "../entities/stock.entity";
import AuthGuard from "../guards/auth.guards";
const router = express.Router()

router.get("/stocks", AuthGuard ,(req, res) => {
    let stockRepository = dataSource.getRepository(Stock);
    stockRepository.find().then(stocks => {
        res.send(stocks);
    })
})

router.get("/stock/:id", AuthGuard ,(req, res) => {
    let stockRepository = dataSource.getRepository(Stock);
    let id = req.params.id;
    stockRepository.findOneBy({ id: parseInt(id) }).then(stock => {
        res.send(stock);
    })
})

router.post("/newStock", AuthGuard ,(req, res) => {
    let stock = new Stock() || {}
    stock.user.id = req.user.id
    stock.product = req.body.product;
    stock.stock = req.body.stock;

    console.log('User-req: ', req.user)
    console.log('User-stock: ', stock.user)

    let stockRepository = dataSource.getRepository(Stock);
    stockRepository.save(stock).then(() => {
        res.status(202).send("Stock created");
    }).catch(error => {
        res.status(500).send("Error creating stock");
    })
})

router.delete("/deleteStock/:id", AuthGuard ,(req, res) => {
    let id = req.params.id;
    let stockRepository = dataSource.getRepository(Stock);
    stockRepository.delete(id).then(() => {
        res.send("Stock deleted");
    }).catch(error => {
        res.send("Error:" + error);
    })
})

export default router;