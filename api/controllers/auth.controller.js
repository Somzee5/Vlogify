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