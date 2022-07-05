import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../env";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { dataSource } from "../../data-source";


const AuthGuard = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token"
                });
            } else {
                let verified_token = jwt.decode(token) as JwtPayload;
                if(verified_token){
                    const userRepository = dataSource.getRepository(User);
                    userRepository.findOneBy({ id:verified_token.id as number }).then(user => {
                        if (user) {
                            next();
                        } else {
                            res.status(401).json({
                                message: "Invalid token"
                            });
                        }
                    })
                }
            }
        });
    }
}

export default AuthGuard;