import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
const router = express.Router()

router.get("/users",(req,res)=>{
    let userRepository = getRepository(User);
    userRepository.find().then(users=>{
        res.send(users);
    })
})

router.get("/user/:id",(req,res)=>{
    let userRepository = getRepository(User);
    let id = req.params.id;
    userRepository.findOneBy({id:parseInt(id)}).then(user => {
        res.send(user);
    })
})

router.post("/newUser",(req,res)=>{
    let user = new User();
    user.name = req.body.name;

    let userRepository = getRepository(User);
    userRepository.save(user).then(()=>{
        res.send("User saved");
    }).catch(error=>{
        res.send("Error:"+error);
    })
})

router.delete("/deleteUser/:id",(req,res)=>{
    let id = req.params.id;
    let userRepository = getRepository(User);
    userRepository.delete(id).then(()=>{
        res.send("User deleted");
    }).catch(error=>{
        res.send("Error:"+error);
    })
})

export default router;