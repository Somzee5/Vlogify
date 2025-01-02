import express from 'express';
import { createVlog } from '../controllers/vlog.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createVlog);


export default router;