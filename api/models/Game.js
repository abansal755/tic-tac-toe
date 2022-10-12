const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    players: [String]
})

module.exports = mongoose.model('Game', gameSchema);