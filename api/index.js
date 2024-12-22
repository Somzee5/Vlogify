// backend apis

import express from 'express';
const app = express();
app.use(express.json())

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


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
