import express from "express";
import { getRepository } from "typeorm";
import { Stock } from "../entities/stock.entity";
const router = express.Router()

router.get("/stocks", (req, res) => {
    let stockRepository = getRepository(Stock);
    stockRepository.find().then(stocks => {
        res.send(stocks);
    })
})

router.get("/stock/:id", (req, res) => {
    let stockRepository = getRepository(Stock);
    let id = req.params.id;
    stockRepository.findOneBy({ id: parseInt(id) }).then(stock => {
        res.send(stock);
    })
})

router.post("/newStock", (req, res) => {
    let stock = new Stock();
    stock.user = req.body.user;
    stock.product = req.body.product;
    stock.stock = req.body.stock;

    let stockRepository = getRepository(Stock);
    stockRepository.save(stock).then(() => {
        res.send("Stock saved");
    }).catch(error => {
        res.send("Error:" + error);
    })
})

router.delete("/deleteStock/:id", (req, res) => {
    let id = req.params.id;
    let stockRepository = getRepository(Stock);
    stockRepository.delete(id).then(() => {
        res.send("Stock deleted");
    }).catch(error => {
        res.send("Error:" + error);
    })
})

export default router;