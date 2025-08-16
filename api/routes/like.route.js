import express from 'express';
import { likeVlog, unlikeVlog, getLikeStatus, getVlogLikes } from '../controllers/like.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/:vlogId', verifyToken, likeVlog);
router.delete('/:vlogId', verifyToken, unlikeVlog);
router.get('/status/:vlogId', verifyToken, getLikeStatus);

// Public route (no authentication required)
router.get('/:vlogId', getVlogLikes);

export default router;
