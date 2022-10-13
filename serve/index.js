require('dotenv').config();
const express = require('express');
const app = express();

const https = require('https');
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname,'../client/build')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
});

const PORT = process.env.PORT || 6000;
let httpServer;
if(process.env.NODE_ENV === 'production'){
    httpServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../cert/akshitbansal_me.crt'))
    }, app);
    httpServer.listen(PORT,() => console.log(`Server is running on port ${PORT}...`));
}
else httpServer = app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));