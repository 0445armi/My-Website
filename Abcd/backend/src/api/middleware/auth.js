const jwt = require('jsonwebtoken');

const getCookieValue = (cookieHeader, cookieName) => {
    const cookies = cookieHeader ? cookieHeader.split('; ') : [];
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

const authenticateToken = (req, res, next) => {
    const cookieHeader = req.headers.cookie;
    const token = cookieHeader ? getCookieValue(cookieHeader, 'accessToken') : null;
        if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = { id: user.userId, role: user.role };
        next();
    });
};

module.exports = { authenticateToken };