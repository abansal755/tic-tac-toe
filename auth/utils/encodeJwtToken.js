const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';

module.exports = async user => {
    return new Promise((resolve, reject) => {
        jwt.sign({ username: user.username }, JWT_ACCESS_SECRET, { expiresIn: 10*24*60*60 /* 10 days */ }, (err, token) => {
            if(err) reject(err);
            else resolve(token);
        });
    });
}