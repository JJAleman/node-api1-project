// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.listen(4000, () => {
    console.log('\n **** server listening on port 4000 ****')
});

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Server works!');
});