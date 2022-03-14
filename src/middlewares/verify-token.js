const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: 'No se encontro ningun Token'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                msg: 'Token invalido'
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Token invalido'
        });
    }
}

module.exports = verifyToken;