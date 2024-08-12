import express from 'express';
import { PORT} from './config.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from '../server/routes/userRoute.js'
import authRouter from '../server/routes/authRoute.js'
import listingRouter from '../server/routes/listingRoute.js'
import cors from 'cors';
import path from 'path';

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };

// const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const MONGO = process.env.MONGO;

app.use(cookieParser());

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/listing',listingRouter);
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal-server-error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'));
// })


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