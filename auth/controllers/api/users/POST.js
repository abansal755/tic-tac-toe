const randomString = require('random-string');
const User = require('../../../models/User');
const encodeJwtToken = require('../../../utils/encodeJwtToken');

module.exports = async (req,res) => {
    let username;
    while(true){
        username = randomString({ length: 4 });
        
        const user = await User.findOne({ username }).exec();
        if(!user) break;
    }

    const user = new User({ username });
    await user.save();

    const token = await encodeJwtToken({ username });
    res.json({
        username,
        token
    });
}