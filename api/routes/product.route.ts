import express from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/product.entity";
const router = express.Router()

router.get("/product",(req,res)=>{
    let productRepository = getRepository(Product);
    productRepository.find().then(products=>{
        res.send(products);
    })
})

router.post("/newProduct",(req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.category = req.body.category;
    product.stock = req.body.stock;
    product.description = req.body.description;

    let productRepository = getRepository(Product);
    productRepository.save(product).then(()=>{
        res.send("Product saved");
    }).catch(error=>{
        res.send("Error:"+error);
    })

})

export default router;
