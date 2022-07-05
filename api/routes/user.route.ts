import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { User } from "../entities/user.entity";
import { dataSource } from "../../data-source";
const router = express.Router()

router.post("/register",(req,res)=>{
    console.log("adsadas")
    let user = new User();
    user.name = req.body.name;
    user.password = bcrypt.hashSync(req.body.password,10);
    user.email = req.body.email;
    let userRepository = dataSource.getRepository(User);
    userRepository.save(user).then(()=>{
        res.send("User saved");
    }).catch(error=>{
        res.send("Error:"+error);
    })
})

router.post("/login", async (req, res) => {
    let userRepository = dataSource.getRepository(User);
    let user = await userRepository.findOneBy({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        res.send("Login success");
    } else {
        res.send("Login failed");
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logout success");
});


export default router;