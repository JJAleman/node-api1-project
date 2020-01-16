// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.listen(4000, () => {
    console.log('\n **** server listening on port 4000 ****')
});

server.use(express.json());

// Making sure server works (It does!) GET request
server.get('/', (req, res) => {
    res.send('Server works!');
})

// -------------------------
// POST
// -------------------------
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (userInfo.length === 0) {
        res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."});
    } else {
        db.insert(userInfo)
        .then( user => {
            res.status(201).json({success: true, user});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "There was an error while saving the user to the database" });
        });
    };
});
    // db.insert(userInfo)
    // .then(user => {
    //     if (user) {
    //         res.status(201).json({success: true, user});
    //     } else {
    //         res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."});
    //     }
    // })
    
    // ----------------------
    // GET request for users
    // ------------------------

    server.get('/api/users', (req, res) => {
        db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The users information could not be retrieved." })
        });
    });