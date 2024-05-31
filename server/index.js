import express from 'express';
import { PORT} from './config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from '../server/routes/userRoute.js'
import authRouter from '../server/routes/authRoute.js'

const app = express();
app.use(express.json());
const MONGO = process.env.MONGO;

app.use('/user',userRouter);
app.use('/auth',authRouter);

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