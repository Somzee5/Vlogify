import express from 'express';
import { createVlog, deleteVlog, updateVlog } from '../controllers/vlog.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createVlog);
router.delete('/delete/:id', verifyToken, deleteVlog);
router.post('/update/:id', verifyToken, updateVlog);

export default router;