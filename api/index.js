// backend apis 

import express, { response } from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(cookieParser());


import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import uploadRouter from './routes/upload.route.js';
import vlogRouter from './routes/vlog.route.js';
import likeRouter from './routes/like.route.js';


mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!!!');
    }).catch((err) => {
        console.log(err);
}); 

app.listen(3000, () => {
    console.log("Server is running at 3000 !!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);
app.use("/api/vlog", vlogRouter);
app.use("/api/like", likeRouter);


// middleware
app.use((err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});
