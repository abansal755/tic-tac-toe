const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    players: [{
        socketId: {
            type: String,
            required: true
        },
        style: {
            type: String,
            required: true,
            enum: ['cross','circle']
        }
    }]
})

module.exports = mongoose.model('Game', gameSchema);