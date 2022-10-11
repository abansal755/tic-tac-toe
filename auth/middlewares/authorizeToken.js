const User = require("../models/User");
const decodeJwtToken = require("../utils/decodeJwtToken");

module.exports = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ message: 'Authorization header not found' });
    const token = authHeader.split(' ')[1];

    let user = await decodeJwtToken(token);
    user = await User.findOne({ username: user.username });
    if(!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
}