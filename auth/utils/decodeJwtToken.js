const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';

module.exports = async token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
            if(err) reject(err);
            else resolve(user);
        });
    });
}