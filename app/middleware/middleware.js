var jwt = require('jsonwebtoken');
const db = require('../models');
const authenticateUser = async (req, res, next) => {
    try {
        var token = req.headers.authorization || null;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_API);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }
        const user = await db.User.findOne({
            attributes: {
                exclude: ['createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deletedAt', 'deletedBy'],
            },
            where: { id: decoded.id, deletedAt: null },
        });

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized access.',
            });
        }

        req.user = user;

        next();
    } catch (err) {

        return res.status(401).json({ message: 'Unauthorized access.' });
    }
};

module.exports = authenticateUser;
