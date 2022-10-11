const axios = require('../../lib/axios');
const SocketMapping = require('../../models/SocketMapping');

module.exports = async (socket,next) => {
    const { token } = socket.handshake.auth;
    if(!token) return next(new Error('Token not found'));
    try {
        const res = await axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { username } = res.data;
        
        // create a socket mapping
        const socketMapping = new SocketMapping({
            username,
            socketId: socket.id
        });
        await socketMapping.save();

        next();
    }
    catch(err){
        next(err);
    }
}