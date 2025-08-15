import express from 'express';
import { createVlog, deleteVlog, getVlog, updateVlog, getAllVlogs } from '../controllers/vlog.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createVlog);
router.delete('/delete/:id', verifyToken, deleteVlog);
router.post('/update/:id', verifyToken, updateVlog);
router.get('/get/:id', getVlog);
router.get('/all', getAllVlogs);

export default router; 