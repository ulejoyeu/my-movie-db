import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken: any = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req["userId"] = userId;
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }
};

export default exports;