const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10*24*60*60 /* 10 days */ });

module.exports = mongoose.model('User', userSchema);

mongoose.model('User').ensureIndexes(err => {
    if(err){
        console.log(err);
        process.exit(1);
    }
})