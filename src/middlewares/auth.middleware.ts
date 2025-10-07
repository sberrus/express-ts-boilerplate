import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"


const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const token = req.headers.token
    console.log(JWT_SECRET, token);

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(500).json({ ok: false, msg: "Token providad not valid" })
            return
        }

        console.log(decoded);
        next()
    })
}

export { checkTokenMiddleware }