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
            players: [
                {
                    socketId: socket.id,
                    style: 'cross'
                },
                {
                    socketId: otherUser.socketId,
                    style: 'cross'
                }
            ]
        });
        const idx = Math.floor(Math.random() * 2);
        game.players[idx].style = 'circle';
        await game.save();

        // Inform both users
        const firstTurn = Math.floor(Math.random() * 2);
        socket.emit('game:search:initiate', {
            opponent: {
                username: otherUser.username,
                socketId: otherUser.socketId
            },
            style: game.players[0].style,
            yourTurn: firstTurn === 0
        });
        io.of('/').sockets.get(otherUser.socketId).emit('game:search:initiate', {
            opponent: {
                username,
                socketId: socket.id
            },
            style: game.players[1].style,
            yourTurn: firstTurn === 1
        })
    }
}