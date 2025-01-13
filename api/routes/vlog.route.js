import express from 'express';
import { createVlog, deleteVlog } from '../controllers/vlog.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createVlog);
router.delete('/delete/:id', verifyToken, deleteVlog);

export default router;