module.exports = (req,res) => {
    res.json({
        username: req.user.username
    });
}