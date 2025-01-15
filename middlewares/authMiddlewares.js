const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

exports.verifyTourGuide = (req, res, next) => {
    if (req.user.role !== 'tour-guide') {
        return res.status(403).json({ message: "Access denied. Tour guides only." });
    }
    next();
};

exports.verifyTourist = (req, res, next) => {
    if (req.user.role !== 'tourist') {
        return res.status(403).json({ message: "Access denied. Tourists only." });
    }
    next();
};

