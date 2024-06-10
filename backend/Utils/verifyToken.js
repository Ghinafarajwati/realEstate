import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token       //akses cookies
    
    if(!token) return next(ErrorHandler(401, 'Unauthorized!'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(ErrorHandler(401, 'Token invalid'));
        req.user = user;
        next()
    })
}