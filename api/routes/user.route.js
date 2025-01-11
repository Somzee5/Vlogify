// crating routes and writing functions

import express from 'express';
const router = express.Router();

import { deleteUser, getUserVlogs, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/vlog/:id', verifyToken, getUserVlogs);

export default router;