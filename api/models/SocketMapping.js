const mongoose = require('mongoose');

const socketMappingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    socketId: {
        type: String,
        required: true,
        unique: true
    },
    lookingForOpponent: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('SocketMapping', socketMappingSchema);