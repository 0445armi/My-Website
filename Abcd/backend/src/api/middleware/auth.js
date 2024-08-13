const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ 
            success: false,
            error,
            message: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).json({ 
                success: false,
                message: 'UnAuthorized Access', 
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'error in admin middleware',
        })
    }
}

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = { _id: user.userId };
        next();
    });
};

module.exports = {requireSignIn, isAdmin, authenticateToken};