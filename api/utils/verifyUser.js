import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Debug logging
    console.log('Token verification:', {
        hasToken: !!token,
        tokenLength: token?.length,
        cookies: Object.keys(req.cookies || {}),
        userAgent: req.headers['user-agent']
    });

    if(!token)
    {
        return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log('Token verification error:', err.message);
            return next(errorHandler(403, ("Forbidden")));
        }

        console.log('Token verified successfully:', { userId: user?.id });
        req.user = user;
        next();
    });
};

// Optional token verification - doesn't fail if no token provided
export const optionalVerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        // No token provided, continue without user info
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            // Invalid token, continue without user info
            console.log('Optional token verification error:', err.message);
            req.user = null;
            return next();
        }

        // Valid token, set user info
        req.user = user;
        next();
    });
}; 