import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(402,'unothorized!'));
    jwt.verify(token,"sdvvsvv323r0d",(err,user)=>{
        if (err) return next(errorHandler(403,'Forbidden'));
        req.user=user;
        next();
    })    
}