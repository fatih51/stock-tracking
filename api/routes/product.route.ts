import express from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/product.entity";
const router = express.Router()

router.get("/products",(req,res)=>{
    let productRepository = getRepository(Product);
    productRepository.find().then(products=>{
        res.send(products);
    })
})

router.get("/product/:id", (req, res) => {
    let productRepository = getRepository(Product);
    let id = req.params.id;
    productRepository.findOneBy({id:parseInt(id)}).then(product => {
        res.send(product);
    })
})

router.post("/newProduct",(req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;

    let productRepository = getRepository(Product);
    productRepository.save(product).then(()=>{
        res.send("Product saved");
    }).catch(error=>{
        res.send("Error:"+error);
    })

})

router.delete("/deleteProduct/:id",(req,res)=>{
    let id = req.params.id;
    let productRepository = getRepository(Product);
    productRepository.delete(id).then(()=>{
        res.send("Product deleted");
    }).catch(error=>{
        res.send("Error:"+error);
    })
})

export default router;
