// crating routes and writing functions

import express from 'express';
const router = express.Router();

import { deleteUser, getUserVlogs, test, updateUser, getUserById } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

router.get('/test', test);
router.get('/:id', getUserById); // Public user profile
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/vlog/:id', verifyToken, getUserVlogs); // Private user vlogs
router.get('/public/vlog/:id', getUserVlogs); // Public user vlogs

export default router;