const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        }, (err, token) => {
            (err) ? reject('Error al generar Token') : resolve(token);
        });
    });
}

module.exports = generateToken;