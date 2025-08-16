import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import Vlog from "../models/vlog.model.js";

export const test = (req, res) => {
    res.json({
        message : "Api route is working",
    });
}

// Get user by ID (public profile)
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        // Remove sensitive information
        const { password, ...userInfo } = user._doc;
        res.status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
};

// update user API
export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"));
    }

    try {
        const updateData = {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
            instagram: req.body.instagram,
            youtube: req.body.youtube,
        };

        // Only hash the password if it's provided
        if (req.body.password) {
            updateData.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateData,
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};



export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);

        res
        .status(200)
        .clearCookie('access_token')
        .json('User has been deleted!');
    } catch (error) {

    }
};



export const getUserVlogs = async (req, res, next) => {
    try {
        const vlog = await Vlog.find({userRef: req.params.id});

        res.status(200).json(vlog);

    } catch (error) {
        next(error);
    }
}; 