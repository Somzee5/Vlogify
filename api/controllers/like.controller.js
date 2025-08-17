import Like from "../models/like.model.js";
import Vlog from "../models/vlog.model.js";
import { errorHandler } from "../utils/error.js";

// Like a vlog
export const likeVlog = async (req, res, next) => {
    try {
        const { vlogId } = req.params;
        const userId = req.user.id;

        // Check if vlog exists
        const vlog = await Vlog.findById(vlogId);
        if (!vlog) {
            return next(errorHandler(404, 'Vlog not found'));
        }

        // Check if user already liked this vlog
        const existingLike = await Like.findOne({ vlogId, userId });
        if (existingLike) {
            return next(errorHandler(400, 'You have already liked this vlog'));
        }

        // Create like
        await Like.create({ vlogId, userId });

        // Update vlog like count
        await Vlog.findByIdAndUpdate(vlogId, { $inc: { likeCount: 1 } });

        res.status(200).json({ message: 'Vlog liked successfully' });
    } catch (error) {
        next(error);
    }
};

// Unlike a vlog
export const unlikeVlog = async (req, res, next) => {
    try {
        const { vlogId } = req.params;
        const userId = req.user.id;

        // Check if like exists
        const existingLike = await Like.findOne({ vlogId, userId });
        if (!existingLike) {
            return next(errorHandler(400, 'You have not liked this vlog'));
        }

        // Remove like
        await Like.findOneAndDelete({ vlogId, userId });

        // Update vlog like count
        await Vlog.findByIdAndUpdate(vlogId, { $inc: { likeCount: -1 } });

        res.status(200).json({ message: 'Vlog unliked successfully' });
    } catch (error) {
        next(error);
    }
};

// Get like status for a user on a vlog
export const getLikeStatus = async (req, res, next) => {
    try {
        const { vlogId } = req.params;
        
        // Debug logging
        console.log('Like status request:', {
            vlogId,
            userId: req.user?.id,
            user: req.user,
            cookies: req.cookies
        });
        
        const userId = req.user?.id;
        
        if (!userId) {
            // Return false for unauthenticated users
            console.log('No user ID found, returning isLiked: false');
            return res.status(200).json({ isLiked: false });
        }

        const like = await Like.findOne({ vlogId, userId });
        const isLiked = !!like;

        res.status(200).json({ isLiked });
    } catch (error) {
        next(error);
    }
};

// Get all likes for a vlog
export const getVlogLikes = async (req, res, next) => {
    try {
        const { vlogId } = req.params;
        
        const likes = await Like.find({ vlogId }).populate('userId', 'username avatar');
        
        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
};
