import express from 'express';
import { PORT} from './config.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from '../server/routes/userRoute.js'
import authRouter from '../server/routes/authRoute.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const MONGO = process.env.MONGO;

app.use(cookieParser());

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal-server-error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

mongoose
    .connect(MONGO)
    .then(()=>{
        console.log("Successfully connected.");
        app.listen(PORT,()=>{
            console.log(`App is runing on port: ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });