const Game = require('../../../../models/Game');
const SocketMapping = require('../../../../models/SocketMapping');

module.exports = (io,socket) => {
    return async () => {
        // Update current user's lookingForOpponentStatus
        const { username } = await SocketMapping.findOne({ socketId: socket.id });
        await SocketMapping.findOneAndUpdate({ username }, { lookingForOpponent: true });
        
        // Find a random opponent
        const filter = {
            lookingForOpponent: true,
            username: {
                $ne: username
            }
        }
        const count = await SocketMapping.countDocuments(filter);
        const otherUser = await SocketMapping.findOne(filter).skip(Math.floor(Math.random() * count));

        // If no opponent is found
        if(!otherUser) return socket.emit('game:search:initiate', {
            error: {
                message: 'No opponent found'
            }
        });

        // Opponent found
        // Update both user's lookingForOpponent status
        await SocketMapping.findOneAndUpdate({ username }, { lookingForOpponent: false });
        await SocketMapping.findOneAndUpdate({ username: otherUser.username }, { lookingForOpponent: false });

        // create a Game
        const game = new Game({
            players: [socket.id,otherUser.socketId]
        });
        const styles = ['cross','cross'];
        const idx = Math.floor(Math.random() * 2);
        styles[idx] = 'circle';
        await game.save();

        // Inform both users
        const firstTurn = Math.floor(Math.random() * 2);
        socket.emit('game:search:initiate', {
            opponent: {
                username: otherUser.username,
                socketId: otherUser.socketId
            },
            style: styles[0],
            yourTurn: firstTurn === 0
        });
        io.of('/').sockets.get(otherUser.socketId).emit('game:search:initiate', {
            opponent: {
                username,
                socketId: socket.id
            },
            style: styles[1],
            yourTurn: firstTurn === 1
        });
    }
}