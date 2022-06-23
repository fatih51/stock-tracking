import express, { json } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../env";


const AuthGuard = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token"
                });
            } else {
                next();
            }
        });
    }
}

export default AuthGuard;