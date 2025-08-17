// backend apis 

import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins temporarily for debugging
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
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

// Test authentication endpoint
app.get('/test-auth', (req, res) => {
    const token = req.cookies.access_token;
    res.status(200).json({ 
        hasToken: !!token,
        tokenLength: token?.length,
        cookies: Object.keys(req.cookies || {}),
        userAgent: req.headers['user-agent']
    });
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
