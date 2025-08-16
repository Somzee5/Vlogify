// backend apis 

import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cookieParser());

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vlogify-frontend.onrender.com', 'https://vlogify.onrender.com'] 
    : ['http://localhost:5173'],
  credentials: true
}));

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

// Dynamic port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT} !!`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);
app.use("/api/vlog", vlogRouter);
app.use("/api/like", likeRouter);

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Vlogify Backend is running!' });
});

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
