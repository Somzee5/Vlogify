import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password:hashedPassword });

    try
    {
        await newUser.save();
        res.status(201).json('User created successfully');
    } 
    catch (error) {
        next(error);
    } 
    
}; 
 

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try 
    {
        const validUser = await User.findOne({ email });
        if(!validUser)
            return next(errorHandler(404, 'User not Found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
            return next(errorHandler(401, 'Invalid Credentials!'));

        const { password: pass, ...rest } = validUser._doc;     // to remove password from response

        const token = jwt.sign( { id: validUser._id },  process.env.JWT_SECRET);
        res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } 
    catch(error)  
    {
        next(error);
    }
};


export const google = async (req, res, next) => {
    try 
    {
        const user = await User.findOne({ email: req.body.email });

        if(user) // if user exists
        {
            const token = jwt.sign( { id: user._id },  process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
 
        }
        else       // else create the user
        {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({ 
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), 
                email: req.body.email, 
                password: hashedPassword,
                avatar: req.body.photo, 
            });

            await newUser.save();

            const token = jwt.sign( { id: user._id },  process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);

        }
    } 
    catch( error ) 
    {
        next(error);
    }
};

 
export const signOut = (req, res, next) => {
    try {
        res
        .clearCookie('access_token')
        .status(200)
        .json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

// Check if user is authenticated
export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }

            try {
                const user = await User.findById(decoded.id).select('-password');
                if (!user) {
                    return res.status(401).json({ success: false, message: 'User not found' });
                }

                res.status(200).json(user);
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};